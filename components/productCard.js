import React from "react";

import { Col, Row as BSRow } from "react-bootstrap";
import ColorRadio from "@/components/input/colorRadio";
import CompDiv from "@/components/Div";
import Stars from "@/components/staticStars";

import addClassName from "@/tool/addClassName";

const Span = addClassName(CompDiv, "d-inline text-textgrey");
const Row = addClassName(BSRow, "g-0 m-0 p-0");
const InfoRow = addClassName(BSRow, "g-0 pb-2");

const ProductCard = ({
  data: {
    product_name,
    model,
    series,
    colors,
    description,
    material,
    blocking_rate,
    absorption_rate,
  },
  dynamic
}) => {
  return (
    <>
      <div className="p-4 pb-0">
        <p className="pb-3 fs-6 m-0 fw-bold text-darkblue dashed">
          {product_name}
        </p>
      </div>
      <div className="p-4 text-textblue border-bottom border-linegrey">
        <InfoRow>
          <Col sm={4}>
            <Span>型號</Span>
          </Col>
          <Col>
            <div className="">{model}</div>
          </Col>
        </InfoRow>
        <InfoRow>
          <Col sm={4}>
            <Span>系列</Span>
          </Col>
          <Col>
            <div className="">{series}</div>
          </Col>
        </InfoRow>
        <InfoRow>
          <Col sm={4}>
            <Span>顏色</Span>
          </Col>
          <Col>
            <div className="pe-1 hstack justify-content-between align-items-start">
              {colors?.map(({ id, name, image_url }) => (
                <ColorRadio
                  key={id}
                  id={id}
                  name={"color"}
                  label={name}
                  src={image_url}
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
            <div>{description}</div>
          </Col>
        </InfoRow>
        <InfoRow>
          <Col sm={4}>
            <Span>面料材質</Span>
          </Col>
          <Col>
            <div>{material}</div>
          </Col>
        </InfoRow>
        <InfoRow>
          <Col sm={4}>
            <Span>遮光效果</Span>
          </Col>
          <Col>
            <Stars number={absorption_rate} />
          </Col>
        </InfoRow>
        <InfoRow>
          <Col sm={4}>
            <Span>吸音效果</Span>
          </Col>
          <Col>
            <Stars number={blocking_rate} />
          </Col>
        </InfoRow>
      </div>
    </>
  );
};

export default ProductCard;
