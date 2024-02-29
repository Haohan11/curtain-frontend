import { useState } from "react";

import Image from "next/image";
import { Row as BSRow, Col } from "react-bootstrap";

import Navbar from "@/components/navbar";
import LeftSide from "@/components/leftSide";
import SearchPannel from "@/components/searchPannel";
import ProductList from "@/components/productList";

import addClassName from "@/tool/addClassName";

const Row = addClassName(BSRow, "g-0");

export default function Home() {
  const [loginState, setLoginState] = useState(true);
  const login = () => setLoginState(true);
  const logout = () => setLoginState(false);

  return (
    <>
      <Navbar isLogin={loginState} login={login} logout={logout} />
      <Row className="border-bottom border-2 m-0" style={{ height: "550px" }}>
        <Col sm={3} className="p-0 h-100 overflow-y-auto scroll">
          <LeftSide isLogin={loginState} />
        </Col>
        <Col className="p-0 bg-linegrey">
          <div className="position-relative h-100">
            <Image
              alt="enviroment image"
              fill
              priority
              sizes="70vw"
              src={"/image/livingroom.jpg"}
              className="object-fit-contain"
            />
          </div>
        </Col>
      </Row>
      <Row
        className="shadow-lg"
        style={{ height: "calc(100vh - var(--nav-height) - 550px)" }}
      >
        <Col sm={"auto"} className="h-100">
          <SearchPannel />
        </Col>
        <Col>
          <ProductList />
        </Col>
      </Row>
    </>
  );
}
