import React from "react";

import Image from "next/image";

import {
  Form,
  FormGroup,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";

const LoginForm = ({ data, toForgetPassword }) => {
  return (
    <Form
      className="h-100 flex-center flex-column text-textgrey pb-10"
      onSubmit={(e) => e.preventDefault()}
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
      <h1 className="fw-bold fs-2 my-5 text-darkblue">業務登入</h1>
      <FormGroup className="w-50 m-3">
        <FormControl
          placeholder="帳號"
          className="border border-1 border-linegrey p-2 text-textgrey text-indent-3"
        ></FormControl>
      </FormGroup>
      <FormGroup className="w-50">
        <FormControl
          type="password"
          className="border border-1 border-linegrey p-2 text-textgrey text-indent-5 letter-spacing-3"
        ></FormControl>
      </FormGroup>
      <FormGroup className="d-flex w-50 py-4 fw-bold mb-10">
        <FormCheck
          id="rememberme"
          label="記住我"
          className="text-darkblue"
        ></FormCheck>
        <span onClick={toForgetPassword} className="ms-auto cursor-pointer">忘記密碼?</span>
      </FormGroup>
      <Button
        className="w-50 rounded rounded-3 bg-darkblue border-0 py-2 fs-6-sm"
        type="submit"
      >
        {data.submitText}
      </Button>
    </Form>
  );
};

export default LoginForm;
