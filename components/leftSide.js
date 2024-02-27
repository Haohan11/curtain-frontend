import { Col, Row as BSRow } from "react-bootstrap";
import ColorRadio from "@/components/input/colorRadio";
import CompDiv from "@/components/Div";
import addClassName from "@/tool/addClassName";

import pickerData from "@/data/pickerData";
import Stars from "./input/starsRating";

const Span = addClassName(CompDiv, "d-inline text-textgrey");
const Row = addClassName(BSRow, "g-0 m-0 p-0");
const InfoRow = addClassName(BSRow, "g-0 pb-2");

const LeftSide = ({ isLogin }) => {
  return (
    <div className="vstack">
      <p className="fs-6 fw-bold text-darkblue p-4 m-0 border-2 border-bottom border-linegrey">
        {isLogin ? "組合列表" : "商品資訊"}
      </p>
      <div className="p-4 pb-0">
        <p className="pb-3 fs-6 m-0 fw-bold text-darkblue dashed">
          Product name
        </p>
      </div>
      <div className="p-4 text-textblue">
        <InfoRow>
          <Col sm={4}>
            <Span>型號</Span>
          </Col>
          <Col>
            <div className="">product name</div>
          </Col>
        </InfoRow>
        <InfoRow>
          <Col sm={4}>
            <Span>系列</Span>
          </Col>
          <Col>
            <div className="">product series</div>
          </Col>
        </InfoRow>
        <InfoRow>
          <Col sm={4}>
            <Span>顏色</Span>
          </Col>
          <Col>
            <div className="pe-1 hstack justify-content-between align-items-start">
              {pickerData.map(({ id, name, image }) => (
                <ColorRadio
                  key={id}
                  id={id}
                  name={"color"}
                  label={name}
                  src={image}
                />
              ))}
            </div>
          </Col>
        </InfoRow>
        <InfoRow>
          <Col sm={4}>
            <Span>描述</Span>
          </Col>
          <Col>
            <div className="">
              沉穩素雅設計，妝點室內氣息。
              內附調整型掛勾，可調節窗簾長度，自由決定是否露出軌道。並讓擺折曲線更加美觀。
            </div>
          </Col>
        </InfoRow>
        <InfoRow>
          <Col sm={4}>
            <Span>面料材質</Span>
          </Col>
          <Col>
            <div className="">curtain material</div>
          </Col>
        </InfoRow>
        <InfoRow>
          <Col sm={4}>
            <Span>遮光效果</Span>
          </Col>
          <Col>
            <Stars name={"cover_rate"} />
          </Col>
        </InfoRow>
        <InfoRow>
          <Col sm={4}>
            <Span>吸音效果</Span>
          </Col>
          <Col>
            <Stars name={"cancel_rate"} />
          </Col>
        </InfoRow>
      </div>
    </div>
  );
};

export default LeftSide;
