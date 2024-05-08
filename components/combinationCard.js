import Image from "next/image";
import { Col, Row } from "react-bootstrap";

import TrashCan from "@/icon/trashcan";
import ProductCard from "@/components/productCard";
import SubmitButton from "@/components/input/submitButton";

import { transImageUrl } from "@/tool/lib";

const CombinationCard = ({
  data: { env_image, name, create_time, environment_name, stockList },
}) => {
  return (
    <div className="px-5 mt-12 pb-8">
      <Row className="g-10 border-bottom pb-12">
        <Col sm={"auto"} className="ps-0">
          <Image
            alt="combination image"
            src={transImageUrl(env_image)}
            className="rounded-3"
            width={120}
            height={120}
          />
        </Col>
        <Col className="pe-0">
          <div className="d-flex mb-4 mt-4">
            <div>
              <span className="fs-5 fw-bold text-darkblue">{name}</span>
              <div className="text-textgrey fs-6-sm mt-1 mb-2">
                <span className="d-inline-block" style={{ width: "90px" }}>
                  建立日期
                </span>
                <span>{create_time}</span>
              </div>
              <div className="text-textgrey">
                <span className="d-inline-block" style={{ width: "90px" }}>
                  組合場景
                </span>
                <span className="text-darkblue fw-bold">
                  {environment_name}
                </span>
              </div>
            </div>
            <div className="ms-auto flex-center align-self-start">
              <SubmitButton type="button" className="px-9">
                開啟組合
              </SubmitButton>
              <div className="ms-6 me-4 text-red cursor-pointer">
                <TrashCan />
              </div>
            </div>
          </div>
          <div className="vstack">
            {stockList.map((stock, index) => (
              <div key={index} className="mb-4 border rounded-3">
                <ProductCard data={stock} dynamic colorCheckable={false} />
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CombinationCard;
