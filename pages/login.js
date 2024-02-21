import React from "react";
import Image from "next/image";
import { Row, Col as BSCol } from "react-bootstrap";
import ArrowLeft from "@/icon/arrow-left";
import addClassName from "@/tool/addClassName";

const Col = addClassName(BSCol, "p-0");

const Login = () => {
  return (
    <Row className="g-0">
      <Col className="">
        <div className="position-relative vh-100 overflow-hidden">
          <Image
            alt="login cover image"
            src="/image/login_cover.jpg"
            fill
            className="object-fit-cover"
          />
          <div className="position-absolute w-100 bottom-0 text-white p-5">
            <div className="px-5">
              <h1 className="fw-bold" style={{ fontSize: "100px" }}>
                Welcome Back
              </h1>
              <p>
                Vitae enim labore vitae, beatae quos vitae quos sequi
                reiciendis, in quas, hic labore eos asperiores, a, cum numquam.
                Quaerat nemo asperiores aut rerum repellat enim esse qui quae,
                asperiores, et dok.
              </p>
              <h1 className="fw-bold" style={{ fontSize: "80px", lineHeight: '50px' }}>. . . .</h1>
            </div>
          </div>
        </div>
      </Col>
      <Col>
        <div className="p-5 border h-100">
          <div className="d-flex align-items-center text-lightgrey fs-5">
            <ArrowLeft className="me-2" />
            <span className="">首頁</span>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
