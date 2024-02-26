import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { Row, Col } from "react-bootstrap";
import Logo from "@/icon/logoSvg";
import User from "@/icon/user";
import ArrowDown from "@/icon/arrow-down";

import Navbar from "@/components/navbar";

export default function Home() {
  const [loginState, setLoginState] = useState(false);
  const login = () => setLoginState(true);
  const logout = () => setLoginState(false);

  return (
    <>
      <Navbar isLogin={loginState} login={login} logout={logout} />
      <Row className="border-bottom border-2 m-0" style={{ height: "610px" }}>
        <Col sm={3} className="p-0 h-100 overflow-y-auto scroll">
          <div className="vstack">
            <p className="fs-5 fw-bold text-darkblue p-4 m-0 border-2 border-bottom border-linegrey">
              {loginState ? "組合列表" : "商品資訊"}
            </p>
            <div className="p-4">
              <p className="pb-4 fs-5 fw-bold text-darkblue dashed">
                Product name
              </p>
            </div>
            <div>
              <span></span>
            </div>
            <div>
              <span></span>
            </div>
            <div>
              <span></span>
            </div>
            <div>
              <span></span>
            </div>
            <div>
              <span></span>
            </div>
          </div>
        </Col>
        <Col className="p-0 bg-linegrey">
          <div className="position-relative h-100">
            <Image alt="enviroment image" fill priority sizes="100vw" src={"/image/livingroom.jpg"} className="object-fit-contain"/>
          </div>
        </Col>
      </Row>
    </>
  );
}
