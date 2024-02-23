import Link from "next/link";
import ArrowDown from "@/icon/arrow-down";
import Logo from "@/icon/logoSvg";
import User from "@/icon/user";
import { Card, Button } from "react-bootstrap";

const Navbar = () => {
  const loginState = false;

  return (
    <div className="hstack py-2 px-4 border-bottom border-2">
      <Logo width={48} />
      <div className="ms-auto flex-center text-darkblue pe-6 border-end border-2 cursor-pointer">
        <span className="fw-bold">變更環境</span>
        <ArrowDown />
      </div>
      <Card className="p-5 text-textblue">
        <ul>
          {["客廳", "臥室", "陽台"].map((item, index) => (
            <li className={`text-center px-12 ${index !== 0 && "mt-2"}`} key={index}>{item}</li>
          ))}
        </ul>
        <Button variant="darkblue mt-3">上傳環境照</Button>
      </Card>
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
