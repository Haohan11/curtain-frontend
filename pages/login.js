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
        </div>
      </Col>
      <Col>
        <div className="p-5 border h-100">
          <div className="d-flex align-items-center text-lightgrey fs-1">
            <ArrowLeft className="me-2" />
            <span className="">首頁</span>
          </div>
          {/* <Image alt="arrow-left svg" src={arrowLeft} width={30} height={30} style={{color: "currentcolor"}}/> */}
        </div>
      </Col>
    </Row>
  );
};

export default Login;
