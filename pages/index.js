import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import Logo from "@/icon/logoSvg";
import User from "@/icon/user";
import ArrowDown from "@/icon/arrow-down";

import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Row className="border border-5 border-red m-0" style={{height: '6100px'}}>
        <Col className="p-0 m-0"></Col>
      </Row>
    </>
  );
}
