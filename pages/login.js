import { useState } from "react";
import { useRouter } from "next/router";

import { Form, FormGroup, FormCheck } from "react-bootstrap";
import { signIn, getSession } from "next-auth/react";

import { checkExpires, validateEmail } from "@/tool/lib";

import TwoPageLayout from "@/components/twoPageLayout";
import FormInput from "@/components/input/formInput";
import FormLabel from "@/components/input/formLabel";
import FormPassword from "@/components/input/formPassword";
import SubmitButton from "@/components/input/submitButton";
import LoginButton from "@/components/input/loginButton";
import AuthCodeInput from "@/components/input/authCodeInput";
import Logo from "@/components/logo";
import ModalWrapper from "@/components/ModalWrapper";
import PopUp from "@/components/PopUp";

import useModals from "@/hook/useModals";
import pageJson from "@/data/pageData";

const pageNameDict = ["login", "forgetPassword", "resetPassword"];

const LoginPage = ({ pageData }) => {
  const router = useRouter();

  const pageName = pageData.pageName;
  const [toLogin, toForgetPassword, toReset] = pageNameDict.map(
    (pn) => () => router.push({ query: { ...router.query, pagename: pn } })
  );
  const { handleShowModal, handleCloseModal, isModalOpen } = useModals();

  const login = async () => {
    const form = document.getElementById("loginForm");
    const formData = new FormData(form);

    const data = Object.fromEntries(formData);
    console.log("login data: ");
    console.log(data);
    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    console.log("result :", result);
    if (result?.ok) {
      handleShowModal("success");
    } else {
      form.reset();
      handleShowModal("popup");
    }
  };

  const Content = ({ pageData: staticPageData }) => {
    const [pageData, setPageData] = useState(staticPageData);
    const [pending, setPending] = useState(true);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      Object.fromEntries(formData);
      console.log(Object.fromEntries(formData));

      const purpose = pageData.submitTo;

      ({
        login: () => {},
        reset: () => {
          if (pending) return;
          toReset();
        },
        resetNow: toLogin,
      })[purpose]();
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
                    <FormInput placeholder="帳號" name="account"></FormInput>
                  </FormGroup>
                  <FormGroup>
                    <FormPassword name="password" />
                  </FormGroup>
                  <FormGroup className="d-flex py-4 fw-bold mb-10">
                    <FormCheck
                      id="rememberme"
                      label="記住我"
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
                  {/* <FormGroup className="mb-3 hstack justify-content-between align-items-center">
                  <AuthCodeInput />
                </FormGroup> */}
                </div>
              ),
              resetPassword: (
                <>
                  <p className="text-center text-darkblue mb-10">
                    Vitae enim labore vitae, beatae quos vitae quos sequi
                    reiciendis, in quas, hic labore eos asperiores
                  </p>
                  <FormGroup controlId="newPassword" className="mb-2">
                    <FormLabel>新密碼</FormLabel>
                    <FormPassword name="newPassword" />
                  </FormGroup>
                  <FormGroup controlId="rePassword" className="mb-3">
                    <FormLabel>再次輸入新密碼</FormLabel>
                    <FormPassword name="rePassword" />
                  </FormGroup>
                </>
              ),
            }[pageName]
          }
          {pageName === "login" ? (
            <LoginButton onClick={login} disabled={pageData.submitDisable}>
              {pageData.submitText || pageData.defaultSubmitText}
            </LoginButton>
          ) : (
            <SubmitButton disabled={pageData.submitDisable}>
              {pageData.submitText || pageData.defaultSubmitText}
            </SubmitButton>
          )}
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
      </Form>
    );
  };

  return (
    <TwoPageLayout
      data={pageData}
      goBack={toLogin}
      content={<Content pageData={pageData} />}
    />
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
