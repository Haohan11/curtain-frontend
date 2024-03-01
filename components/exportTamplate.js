import Image from "next/image";
import Curtain from "@/icon/curtain";
import ColorRadio from "@/components/input/colorRadio";
import Stars from "@/components/staticStars";
import { Row, Col } from "react-bootstrap";

import addClassName from "@/tool/addClassName";

const Title = addClassName(Col, "text-textgrey");
const Box = addClassName(Row, "g-0");

const ExportTemplate = ({ data: { env, product } }) => {
  return (
    <div id="export_target" className="position-fixed export-template border">
      <div className="head fs-6-sm fw-bold hstack w-100 justify-content-between px-4">
        <div>
          <Curtain width={28} color={"#D7DEEA"} />
          <span className="fs-5-sm ms-2 text-darkblue align-bottom">
            {product.product_name}
          </span>
        </div>
        <div className="hstack">
          <span className="text-textgrey me-4">顏色</span>
          {product.colors.map((color) => (
            <div
              key={color.id}
              className={`ms-3 lh-1 ${
                color.id === 0 &&
                "border border-3 border-checkboxblue rounded-2"
              }`}
            >
              <ColorRadio />
            </div>
          ))}
        </div>
        <div>
          <span className="text-textgrey me-4">展示空間</span>
          <span className="fw-bold text-textblue">{env}</span>
        </div>
      </div>
      <div className="w-100 img-box position-relative">
        <Image
          alt="export image"
          placeholder="blur"
          blurDataURL="/image/livingroom.jpg"
          fill
          sizes="842px"
          src="/image/livingroom.jpg"
          crossOrigin="anonymous"
        />
      </div>
      <div className="row g-5 fs-6-sm p-4 text-textblue">
        <div className="col-4 border-end border-2">
          <Box>
            <Title>型號</Title>
            <Col>{product.model}</Col>
          </Box>
          <Box>
            <Title>系列</Title>
            <Col>{product.series}</Col>
          </Box>
          <Box>
            <Title>面料材質</Title>
            <Col>{product.material}</Col>
          </Box>
        </div>
        <div className="col-3 border-end border-2">
          <Box>
            <Title>遮光效果</Title>
            <Col>
              <Stars />
            </Col>
          </Box>
          <Box>
            <Title>吸音效果</Title>
            <Col>
              <Stars />
            </Col>
          </Box>
          <Box></Box>
        </div>
        <div className="col-5">
          <Row>
            <Title className="col-auto">描述</Title>
            <Col>{product.description}</Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ExportTemplate;
