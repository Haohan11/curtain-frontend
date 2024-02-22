import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Row, Col as BSCol, Container } from "react-bootstrap";
import ArrowLeft from "@/icon/arrow-left";
import addClassName from "@/tool/addClassName";

const Col = addClassName(BSCol, "p-0");

const TwoPageLayout = ({ data, content, returnTo }) => {
  const ReturnButton = () => (
    <>
      <ArrowLeft width="2rem" height="2rem" className="me-2 " />
      <span className="fs-5-sm">{data.returnText}</span>
    </>
  );

  return (
    <Row className="g-0">
      <Col className="d-none d-lg-block">
        <div className="position-relative vh-100 overflow-hidden">
          <Image
            alt="login cover image"
            src={data.cover_image}
            sizes="50vw"
            priority
            fill
            className="object-fit-cover"
          />
          <div className="position-absolute w-100 bottom-0 text-white p-5">
            <Container className="p-12">
              <h1 className="fw-bold" style={{ fontSize: "100px" }}>
                {data.cover_title}
              </h1>
              <p>
                Vitae enim labore vitae, beatae quos vitae quos sequi
                reiciendis, in quas, hic labore eos asperiores, a, cum numquam.
                Quaerat nemo asperiores aut rerum repellat enim esse qui quae,
                asperiores, et dok.
              </p>
              <p
                className="fw-bold letter-spacing-5"
                style={{ fontSize: "80px", lineHeight: "50px" }}
              >
                <span className="text-orange ms--1">.</span> . . .
              </p>
            </Container>
          </div>
        </div>
      </Col>
      <Col>
        <div className="vh-100 px-4 flex-column">
          <div
            className="flex-center text-textgrey px-5"
            style={{ height: "10vh" }}
          >
            {returnTo instanceof Function && (
              <div
                className="flex-center cursor-pointer me-auto"
                onClick={returnTo}
              >
                <ReturnButton />
              </div>
            )}
            {returnTo === "homepage" && (
              <Link href={"/"} className="flex-center me-auto">
                <ReturnButton />
              </Link>
            )}
          </div>
          <div style={{ height: "80vh" }}>{content}</div>
          <div className="flex-center" style={{ height: "10vh" }}>
            <p className="text-textgrey">
              Copyright © 2024 XiangYu Drapery. All rights reserved.
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TwoPageLayout;
