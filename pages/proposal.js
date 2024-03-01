import { Row, Col } from "react-bootstrap";
import FormInput from "@/components/input/formInput";
import Image from "next/image";

import Logo from "@/icon/logoWhiteSvg";
import ReturnButton from "@/components/returnButton";
import Cross from "@/icon/cross";
import Search from "@/icon/search";

import productData from "@/data/productData"

const combination = new Array(5).fill(new Array(2).fill(productData))

const ProposalPage = () => {
  return (
    <Row className="g-0">
      <Col sm={"auto"} className="d-none d-md-block">
        <div className="vh-100 position-relative p-6">
          <Image
            alt="curtain image"
            sizes="120px"
            priority
            fill
            src={"/image/curtain.jpg"}
          />
          <Logo className="position-relative" />
        </div>
      </Col>
      <Col>
        <div className="vh-100 position-relative overflow-y-auto">
          <div className="position-sticky top-0 p-6 flex-center justify-content-between border-bottom bg-white">
            <div className="flex-center text-textgrey cursor-pointer">
              <ReturnButton />
            </div>
            <div className="flex-center text-textblue cursor-pointer">
              <Cross />
              <span className="ms-2">新增提案組合</span>
            </div>
          </div>
          <div className="p-8">
            <div className="hstack justify-content-between">
              <span className="fs-1-sm fw-bold text-darkblue">
                我的提案組合
              </span>
              <div
                style={{ width: "300px" }}
                className="position-relative"
              >
                <FormInput placeholder="搜尋" className="pe-8" />
                <div className="position-absolute top-0 end-0 text-linegrey p-2">
                  <Search />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProposalPage;
