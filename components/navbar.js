import Link from "next/link";
import ArrowDown from "@/icon/arrow-down";
import Logo from "@/icon/logoSvg";
import User from "@/icon/user";
import { Card, Button } from "react-bootstrap";
import RawButton from "./input/rawButton";

import navData from "@/data/navData"

const Navbar = () => {
  const loginState = false;
  const data = navData["changeEnv"]

  return (
    <div className="hstack py-2 px-4 border-bottom border-2">
      <Logo width={48} />
      {/* nav item below */}
      <div className="ms-auto flex-center text-darkblue pe-6 border-end border-2 cursor-pointer">
        <span className="fw-bold">{data.navText}</span>
        <ArrowDown />
      </div>
      <Card className="p-5 text-textblue shadow">
        <ul className="vstack">
          {data.items.map((item, index) => (
            <li className={`text-center px-12 cursor-pointer ${index !== 0 && "mt-2"}`} key={index}>{item}</li>
          ))}
        </ul>
        <Button variant="darkblue mt-3">上傳環境照</Button>
      </Card>
      {/* nav item above */}
      {loginState ? (
        <Link href="/login" className="ms-4 pe-4 flex-center text-darkblue">
          <User className="me-2" />
          <span className="fw-bold">已登入</span>
        </Link>
      ) : (
        <Link href="/login" className="ms-4 pe-4 flex-center text-darkblue">
          <User className="me-2" />
          <span className="fw-bold">登入</span>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
