import { useState } from "react";

import Image from "next/image";

import {
  Form,
  FormGroup,
  FormControl,
  FormLabel as BSFormLabel,
  FormCheck,
  Button,
} from "react-bootstrap";

import TwoPageLayout from "@/components/twoPageLayout";
import pageJson from "@/data/pageData";
import FormInput from "@/components/input/formInput";
import FormLabel from "@/components/input/formLabel";
import FormPassword from "@/components/input/formPassword";

const pageData = pageJson;

const Login = () => {
  const [pageName, setPageName] = useState("login");
  const data = pageData[pageName];
  const toLogin = () => setPageName("login");
  const toReset = () => setPageName("resetPassword");
  const toForgetPassword = () => setPageName("forgetPassword");

  const handleSubmit = (e) => {
    e.preventDefault();
    const purpose = data.submitTo;

    purpose === "login" && (() => {});
    purpose === "reset" && toReset();
    purpose === "resetNow" && toLogin();
  };

  const content = (
    <Form
      className="h-100 flex-center flex-column text-textgrey pb-10"
      onSubmit={handleSubmit}
    >
      <div
        className="position-relative mb-4"
        style={{ width: "150px", height: "150px" }}
      >
        <Image
          alt="logo"
          quality={100}
          className="object-fit-contain"
          fill
          src="/image/logo.svg"
        />
      </div>
      <h1 className="fw-bold fs-2 my-5 text-darkblue">{data.title}</h1>
      <div className="col-6">
        {pageName === "login" && (
          <>
            <FormGroup className="mb-3">
              <FormInput placeholder="帳號"></FormInput>
            </FormGroup>
            <FormGroup>
              <FormPassword />
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
              <FormInput placeholder="Mail"></FormInput>
            </FormGroup>
          </>
        )}
        {pageName === "resetPassword" && (
          <>
            <p className="text-center text-darkblue mb-10">
              Vitae enim labore vitae, beatae quos vitae quos sequi reiciendis,
              in quas, hic labore eos asperiores
            </p>
            <FormGroup className="mb-2">
              <FormLabel>新密碼</FormLabel>
              <FormPassword />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>再次輸入新密碼</FormLabel>
              <FormPassword />
            </FormGroup>
          </>
        )}
        <Button
          variant="darkblue"
          className="w-100 rounded rounded-3 border-0 fs-6-sm"
          type="submit"
          style={{ paddingBlock: ".75rem" }}
        >
          {data.submitText}
        </Button>
      </div>
    </Form>
  );

  return <TwoPageLayout data={data} goBack={toLogin} content={content} />;
};

Login.getLayout = (page) => page;

export default Login;
