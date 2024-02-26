import { useState } from "react";
import Image from "next/image";

import { Form, FormGroup, FormCheck } from "react-bootstrap";

import TwoPageLayout from "@/components/twoPageLayout";
import pageJson from "@/data/pageData";
import FormInput from "@/components/input/formInput";
import FormLabel from "@/components/input/formLabel";
import FormPassword from "@/components/input/formPassword";
import SubmitButton from "@/components/input/submitButton";
import AuthCodeInput from "@/components/input/authCodeInput";

import Logo from "@/components/logo";

const LoginPage = () => {
  const [pageName, setPageName] = useState("login");
  const pageData = pageJson[pageName];
  const toLogin = () => setPageName("login");
  const toReset = () => setPageName("resetPassword");
  const toForgetPassword = () => setPageName("forgetPassword");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    Object.fromEntries(formData);
    console.log(Object.fromEntries(formData));

    const purpose = pageData.submitTo;

    purpose === "login" && (() => {});
    purpose === "reset" && toReset();
    purpose === "resetNow" && toLogin();
  };

  const content = (
    <Form
      className="h-100 flex-center flex-column text-textgrey pb-10"
      onSubmit={handleSubmit}
    >
      <Logo className="mb-3" width={150} />
      {/* <div
        className="position-relative mb-4"
        style={{ width: "150px", height: "150px" }}
      >
        <Image
          alt="logo"
          className="object-fit-contain"
          fill
          src="/image/logo.svg"
        />
      </div> */}
      <h1 className="fw-bold fs-2 my-5 text-darkblue">{pageData.title}</h1>
      <div className="col-6">
        {pageName === "login" && (
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
        <SubmitButton>{pageData.submitText}</SubmitButton>
      </div>
    </Form>
  );

  return <TwoPageLayout data={pageData} goBack={toLogin} content={content} />;
};

LoginPage.getLayout = (page) => page;

export default LoginPage;
