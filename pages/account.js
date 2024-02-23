import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  Row,
  Col,
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


const pageData = pageJson;

const Login = () => {
  const data = pageData["account"];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const content = (
    <Form className="h-100 border" onSubmit={handleSubmit}>
      <Row>
        <Col sm={4}>
          <FormInput />
        </Col>
        <Col sm={8}>
          <FormInput />
        </Col>
      </Row>
      {/* <div
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
          <span className="ms-auto cursor-pointer">忘記密碼?</span>
        </FormGroup> */}
      <Button
        variant="darkblue"
        className="w-100 rounded rounded-3 border-0 fs-6-sm"
        type="submit"
        style={{ paddingBlock: ".75rem" }}
      >
        {data.submitText}
      </Button>
      {/* </div> */}
    </Form>
  );

  return <TwoPageLayout data={data} content={content} />;
};

Login.getLayout = (page) => page;

export default Login;
