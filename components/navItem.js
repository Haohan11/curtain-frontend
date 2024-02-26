import { useState } from "react";

import Link from "next/link";

import { Card } from "react-bootstrap";
import ArrowDown from "@/icon/arrow-down";

import Div from "@/components/exposeDiv";
import addClassName from "@/tool/addClassName";

const NavItem = ({ data, thin, button, isShow, setShow, ...props }) => {
//   const [show, setShow] = useState(false);
  const Wrapper = addClassName(Div, "position-relative pe-4");

  return (
    <Wrapper {...props}>
      <div
        className="flex-center text-darkblue cursor-pointer"
        onClick={setShow}
      >
        <span className="fw-bold">{data.navText}</span>
        <ArrowDown width={28} />
      </div>
      {isShow && (
        <Card
          className="position-absolute end-0 p-5 text-textblue shadow rounded-3 border-0"
          style={{ top: "calc(100% + .5rem)" }}
        >
          <ul className="vstack">
            {data.items.map((item, index) => (
              <li
                onClick={item.action}
                className={`px-${
                  thin ? "3" : "12"
                } text-nowrap cursor-pointer hover-orange fw-bold  fs-6 ${
                  index !== 0 && "mt-2"
                }`}
                key={index}
              >
                {item.link ? (
                  <Link href={item.link}>{item.label}</Link>
                ) : (
                  item.label
                )}
              </li>
            ))}
          </ul>
          {button}
        </Card>
      )}
    </Wrapper>
  );
};

export default NavItem;
