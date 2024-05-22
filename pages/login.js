import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import { Form, FormGroup, FormCheck } from "react-bootstrap";
import { signIn, getSession } from "next-auth/react";

import { checkExpires, validateEmail } from "@/tool/lib";
import {
  sendAuthcodeEmail,
  authCodeCheck,
  resetPassword,
} from "@/tool/request";

import TwoPageLayout from "@/components/twoPageLayout";
import FormInput from "@/components/input/formInput";
import FormLabel from "@/components/input/formLabel";
import FormPassword from "@/components/input/formPassword";
import SubmitButton from "@/components/input/submitButton";
import AuthCodeInput from "@/components/input/authCodeInput";
import Logo from "@/components/logo";
import ModalWrapper from "@/components/ModalWrapper";
import PopUp from "@/components/PopUp";
import VersionCode from "@/components/VersionCode";
import useLocalStorage from "@/hook/useLocalStorage";

import useModals from "@/hook/useModals";
import pageJson from "@/data/pageData";

const pageNameDict = ["login", "forgetPassword", "resetPassword", "pending"];
const passwordReg =
  /^(?=.*[a-zA-Z0-9].*[a-zA-Z0-9].*[a-zA-Z0-9].*[a-zA-Z0-9]).+$/;

const pendingExpire = 3600 * 1000;
const checkPending = () => {
  try {
    const { status, expire } = JSON.parse(localStorage.getItem("isPending"));
    return (
      (!!status && Date.now() - expire < pendingExpire) ||
      !!localStorage.setItem(
        "isPending",
        JSON.stringify({ status: false, expire })
      )
    );
  } catch {
    return false;
  }
};

const LoginPage = ({ pageData }) => {
  const router = useRouter();

  const pageName = pageData.pageName;

  const [toLogin, toForgetPassword, toReset, toPending] = pageNameDict.map(
    (pn) => () => router.push({ query: { pagename: pn } })
  );

  const { handleShowModal, handleCloseModal, isModalOpen } = useModals();

  const [rememberMe, setRememberMe, clearRememberMe] =
    useLocalStorage("rememberMe");

  const Content = ({ pageData: staticPageData }) => {
    const [pageData, setPageData] = useState(staticPageData);
    const passwordRef = useRef({ new: "", re: "" });
    const passwordMatch = () =>
      !!passwordRef.current.new &&
      passwordRef.current.new === passwordRef.current.re;

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      data.rememberMe ? setRememberMe(data.account) : clearRememberMe();

      console.log(`${pageName} form submit:`, Object.fromEntries(formData));

      const purpose = pageData.submitTo;
      await {
        login: async () => {
          const result = await signIn("credentials", {
            ...data,
            redirect: false,
          });
          console.log("result :", result);
          if (result?.ok) {
            handleShowModal("success");
          } else {
            e.target.reset();
            handleShowModal("popup");
          }
        },
        pending: async () => {
          localStorage.setItem(
            "isPending",
            JSON.stringify({ status: true, expire: Date.now() })
          );
          setPageData((prev) => ({
            ...prev,
            submitText: "正在取得電子信件...",
            submitDisable: true,
          }));
          const result = await sendAuthcodeEmail(data.email);

          if (result.message === "NoEmail")
            return handleShowModal("wrongEmail");

          if (!result.status) return handleShowModal("ServerError");

          setPageData((prev) => ({
            ...prev,
            submitText: "電子郵件已寄送",
            submitDisable: false,
          }));
          toPending();
        },
        reset: async () => {
          const result = await authCodeCheck(data.auth_code);
          if (!result.status) return handleShowModal("auth-fail");

          try {
            localStorage.setItem("reset-token", result.data.token);
            handleShowModal("auth-success");
          } catch {
            handleShowModal("auth-fail");
          }
        },
        resetNow: async () => {
          const token = localStorage.getItem("reset-token");
          const result = await resetPassword(token, passwordRef.current.new);
          if (!result.status) return handleShowModal("ServerError");
          localStorage.removeItem("reset-token");
          toLogin();
        },
      }[purpose]();
    };

    return (
      <Form
        className="h-100 flex-center flex-column text-textgrey pb-10"
        onSubmit={handleSubmit}
        id="loginForm"
      >
        <Logo className="mb-3" width={150} />
        <h1 className="fw-bold fs-2 my-5 text-darkblue">{pageData.title}</h1>
        <div style={{ width: "clamp(275px, 60% ,350px)" }}>
          {
            {
              login: (
                <>
                  <FormGroup className="mb-3">
                    <FormInput
                      placeholder="帳號"
                      defaultValue={rememberMe}
                      name="account"
                    ></FormInput>
                  </FormGroup>
                  <FormGroup>
                    <FormPassword name="password" />
                  </FormGroup>
                  <FormGroup className="d-flex py-4 fw-bold mb-10">
                    <FormCheck
                      name="rememberMe"
                      label="記住我"
                      defaultValue={!!rememberMe}
                      className="text-darkblue"
                    ></FormCheck>
                    <span
                      onClick={toForgetPassword}
                      className="ms-auto cursor-pointer"
                    >
                      忘記密碼?
                    </span>
                  </FormGroup>
                </>
              ),
              forgetPassword: (
                <div>
                  <p className="text-center text-darkblue m-2">
                    請輸入電子郵件信箱後
                  </p>
                  <p className="text-center text-darkblue mb-10">
                    點擊下方按鈕獲得驗證碼
                  </p>
                  <FormGroup className="mb-6">
                    <FormInput
                      placeholder="電子郵件"
                      name="email"
                      onChange={(e) => {
                        const pass = validateEmail(e.target.value);
                        setPageData((prev) => ({
                          ...prev,
                          submitDisable: !pass,
                          submitText:
                            e.target.value === ""
                              ? prev.defaultSubmitText
                              : pass
                              ? "取得驗證碼"
                              : "電子郵件格式錯誤",
                        }));
                      }}
                    ></FormInput>
                  </FormGroup>
                </div>
              ),
              pending: (
                <div>
                  <p className="text-center text-darkblue mb-10">
                    請輸入電子郵件信箱的驗證碼
                  </p>
                  <FormGroup className="mb-6 hstack justify-content-between align-items-center">
                    <AuthCodeInput
                      onChange={(value) => {
                        const valid = value.length === 4;
                        setPageData((prev) => ({
                          ...prev,
                          submitDisable: !valid,
                          ...(valid && { submitText: "重設密碼" }),
                        }));
                      }}
                    />
                  </FormGroup>
                </div>
              ),
              resetPassword: (
                <>
                  <p className="text-center text-darkblue mb-10">
                    請輸入要使用的新密碼後重新登入
                  </p>
                  <FormGroup controlId="newPassword" className="mb-2">
                    <FormLabel>新密碼</FormLabel>
                    <FormPassword
                      name="newPassword"
                      onChange={(e) => {
                        passwordRef.current.new = e.target.value;
                        const valid = passwordReg.test(e.target.value);
                        const isMatch = passwordMatch();
                        setPageData((prev) => ({
                          ...prev,
                          submitDisable: !isMatch || !valid,
                          submitText: valid
                            ? isMatch
                              ? prev.defaultSubmitText
                              : "密碼不相符"
                            : "密碼格式錯誤",
                        }));
                      }}
                    />
                  </FormGroup>
                  <FormGroup controlId="rePassword" className="mb-6">
                    <FormLabel>再次輸入新密碼</FormLabel>
                    <FormPassword
                      name="rePassword"
                      onChange={(e) => {
                        passwordRef.current.re = e.target.value;
                        const valid = passwordReg.test(e.target.value);
                        const isMatch = passwordMatch();
                        setPageData((prev) => ({
                          ...prev,
                          submitDisable: !isMatch || !valid,
                          submitText: valid
                            ? isMatch
                              ? prev.defaultSubmitText
                              : "密碼不相符"
                            : "密碼格式錯誤",
                        }));
                      }}
                    />
                  </FormGroup>
                </>
              ),
            }[pageName]
          }
          <SubmitButton disabled={pageData.submitDisable}>
            {pageData.submitText || pageData.defaultSubmitText}
          </SubmitButton>
        </div>

        <ModalWrapper
          key="popup"
          show={isModalOpen("popup")}
          size="lg"
          onHide={() => handleCloseModal("popup")}
        >
          <PopUp
            imageSrc={"/icon/circle-error.svg"}
            title={"帳號或密碼錯誤"}
            confirmOnClick={() => handleCloseModal("popup")}
          />
        </ModalWrapper>

        <ModalWrapper
          key="success"
          show={isModalOpen("success")}
          size="lg"
          onHide={() => router.push("/")}
        >
          <PopUp
            imageSrc={"/icon/check-circle.svg"}
            title={"登入成功"}
            confirmOnClick={() => router.push("/")}
          />
        </ModalWrapper>

        <ModalWrapper
          key="auth-success"
          show={isModalOpen("auth-success")}
          size="lg"
          onHide={() => {
            handleCloseModal("auth-success");
            toReset();
          }}
        >
          <PopUp
            imageSrc={"/icon/check-circle.svg"}
            title={"驗證成功"}
            confirmOnClick={() => {
              handleCloseModal("auth-success");
              toReset();
            }}
          />
        </ModalWrapper>

        <ModalWrapper
          key="auth-fail"
          show={isModalOpen("auth-fail")}
          size="lg"
          onHide={() => handleCloseModal("auth-fail")}
        >
          <PopUp
            imageSrc={"/icon/circle-error.svg"}
            title={"驗證失敗"}
            confirmOnClick={() => handleCloseModal("auth-fail")}
          />
        </ModalWrapper>

        <ModalWrapper
          key="wrongEmail"
          show={isModalOpen("wrongEmail")}
          size="lg"
        >
          <PopUp
            imageSrc={"/icon/circle-error.svg"}
            title={"錯誤的電子郵件"}
            confirmOnClick={() => handleCloseModal("wrongEmail")}
          />
        </ModalWrapper>

        <ModalWrapper
          key="ServerError"
          show={isModalOpen("ServerError")}
          size="lg"
        >
          <PopUp
            imageSrc={"/icon/circle-error.svg"}
            title={"發生錯誤請稍後再試"}
            confirmOnClick={() => handleCloseModal("ServerError")}
          />
        </ModalWrapper>
      </Form>
    );
  };

  useEffect(() => {
    checkToken: try {
      const resetToken = localStorage.getItem("reset-token");
      if (!resetToken) break checkToken;

      localStorage.removeItem("isPending");
      pageName !== "resetPassword" && toReset();
      return;
    } catch {
      console.log(localStorage.getItem("reset-token"));
    }

    const isPending = checkPending();
    isPending
      ? pageName !== "pending" && toPending()
      : (() => {
          localStorage.removeItem("isPending");
          ["pending"].includes(pageName) && toLogin();
        })();
  }, [router]);

  return (
    <>
      <TwoPageLayout
        data={pageData}
        goBack={toLogin}
        content={<Content pageData={pageData} />}
      />
      <VersionCode />
    </>
  );
};

LoginPage.getLayout = (page) => page;

export default LoginPage;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session && !checkExpires(session._exp)) {
    return {
      redirect: { destination: "/" },
    };
  }

  const pagename = pageNameDict.includes(context.query.pagename)
    ? context.query.pagename
    : "login";

  return {
    props: {
      pageData: pageJson[pagename],
    },
  };
};
