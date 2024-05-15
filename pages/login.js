import { useState } from "react";
import { useRouter } from "next/router";

import { Form, FormGroup, FormCheck } from "react-bootstrap";
import { signIn, getSession } from "next-auth/react";

import { checkExpires } from "@/tool/lib";

import TwoPageLayout from "@/components/twoPageLayout";
import FormInput from "@/components/input/formInput";
import FormLabel from "@/components/input/formLabel";
import FormPassword from "@/components/input/formPassword";
import SubmitButton from "@/components/input/submitButton";
import LoginButton from "@/components/input/loginButton";
import AuthCodeInput from "@/components/input/authCodeInput";
import Logo from "@/components/logo";

import pageJson from "@/data/pageData";

const LoginPage = () => {
  const router = useRouter();
  const [pageName, setPageName] = useState("login");
  const pageData = pageJson[pageName];
  const toLogin = () => setPageName("login");
  const toReset = () => setPageName("resetPassword");
  const toForgetPassword = () => setPageName("forgetPassword");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    Object.fromEntries(formData);
    console.log(Object.fromEntries(formData));

    const purpose = pageData.submitTo;

    purpose === "login" && (() => {});
    purpose === "reset" && toReset();
    purpose === "resetNow" && toLogin();
  };

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
      router.push("/");
    } else {
      form.reset();
      alert("帳號密碼錯誤");
    }
  };

  const content = (
    <Form
      className="h-100 flex-center flex-column text-textgrey pb-10"
      onSubmit={handleSubmit}
      id="loginForm"
    >
      <Logo className="mb-3" width={150} />
      <h1 className="fw-bold fs-2 my-5 text-darkblue">{pageData.title}</h1>
      <div style={{ width: "clamp(275px, 60% ,350px)" }}>
        {pageName === "login" && (
          <>
            <FormGroup className="mb-3">
              <FormInput placeholder="帳號" name="account"></FormInput>
            </FormGroup>
            <FormGroup>
              <FormPassword name="password" />
            </FormGroup>
            <FormGroup className="d-flex py-4 fw-bold mb-10">
              {/* <FormCheck
                id="rememberme"
                label="記住我"
                className="text-darkblue"
              ></FormCheck>
              <span
                onClick={toForgetPassword}
                className="ms-auto cursor-pointer"
              >
                忘記密碼?
              </span> */}
            </FormGroup>
          </>
        )}
        {pageName === "forgetPassword" && (
          <>
            <p className="text-center text-darkblue mb-10">
              Vitae enim labore vitae, beatae quos vitae quos sequi reiciendis,
              in quas, hic labore eos asperiores
            </p>
            <FormGroup className="mb-3">
              <FormInput placeholder="電話號碼" name="phoneNumber"></FormInput>
            </FormGroup>
            <FormGroup className="mb-3 hstack justify-content-between align-items-center">
              <AuthCodeInput />
            </FormGroup>
          </>
        )}
        {pageName === "resetPassword" && (
          <>
            <p className="text-center text-darkblue mb-10">
              Vitae enim labore vitae, beatae quos vitae quos sequi reiciendis,
              in quas, hic labore eos asperiores
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
        )}
        {pageName === "login" && (
          <>
            <LoginButton onClick={login}>{pageData.submitText}</LoginButton>
          </>
        )}
        {pageName != "login" && (
          <>
            <SubmitButton>{pageData.submitText}</SubmitButton>
          </>
        )}
      </div>
    </Form>
  );

  return <TwoPageLayout data={pageData} goBack={toLogin} content={content} />;
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

  return {
    props: {},
  };
};
