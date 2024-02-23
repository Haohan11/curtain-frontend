import Link from "next/link";
import { Row } from "react-bootstrap";
import Logo from "@/icon/logoSvg";
import User from "@/icon/user";
import ArrowDown from "@/icon/arrow-down";

import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Row></Row>
      <Row></Row>
      <h1 className="text-orange">
        <Link href="/account">Account Page</Link>
      </h1>
    </>
  );
}
