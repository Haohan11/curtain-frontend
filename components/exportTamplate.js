import { useState } from "react";

import Curtain from "@/icon/curtain";
import ColorRadio from "@/components/input/colorRadio";
import Stars from "@/components/staticStars";
import { Row, Col } from "react-bootstrap";

import { transImageUrl, toArray, getMatirx3dText } from "@/tool/lib";
import addClassName from "@/tool/addClassName";

const Title = addClassName(Col, "text-textgrey");
const Box = addClassName(Row, "g-0");

const ExportTemplate = ({
  data: {
    env_name,
    env_image,
    color_image,
    mask_image,
    stock,
    colorIndex,
    perspect,
    width: frameWidth,
  },
}) => {
  return (
      <div
        id="export_target"
        className="position-absolute top-0 start-0 export-template bg-white border"
      >
        <div className="head fs-6-sm fw-bold hstack w-100 justify-content-between px-4">
          <div>
            <Curtain width={28} color={"#D7DEEA"} />
            <span className="fs-5-sm ms-2 text-darkblue align-bottom">
              {stock?.name}
            </span>
          </div>
          <div className="hstack">
            <span className="text-textgrey me-4">顏色</span>
            {stock?.colorList &&
              stock.colorList.map((color, index) => (
                <div key={color.id} className="me-2">
                  <ColorRadio
                    src={transImageUrl(color.color_image)}
                    defaultChecked={index === colorIndex}
                    showBorder={index === colorIndex}
                  />
                </div>
              ))}
          </div>
          <div>
            <span className="text-textgrey me-4">展示空間</span>
            <span className="fw-bold text-textblue">{env_name}</span>
          </div>
        </div>
        <div
          className="mx-auto img-box position-relative"
          style={{
            width: frameWidth,
            aspectRatio: "16 / 9",
          }}
        >
          <img
            className="h-100 w-100 position-absolute top-0 left-0"
            style={{
              objectFit: "contain",
            }}
            alt="enviroment image"
            src={`${transImageUrl(env_image)}`}
          ></img>
          <div
            className="h-100 w-100 position-absolute top-0 start-0"
            style={{
              maskImage: `url('${transImageUrl(mask_image)}')`,
              maskRepeat: "no-repeat",
              maskSize: "contain",
            }}
          >
            <div
              className="position-absolute"
              style={{
                width: "50%",
                height: "50%",
                top: "25%",
                left: "25%",
              }}
            >
              {frameWidth &&
                Array.isArray(perspect) &&
                perspect.map(({ width, originalPos, targetPos }, index) => (
                  <img
                    key={index}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      top: "0",
                      left: "0",
                      transformOrigin: "0 0",
                      transform: getMatirx3dText(
                        originalPos.map(([x, y]) => [
                          (frameWidth / width) * x,
                          (frameWidth / width) * y,
                        ]),
                        targetPos.map(({ x, y }) => [
                          (frameWidth / width) * x,
                          (frameWidth / width) * y,
                        ])
                      ),
                      objectFit: "cover",
                    }}
                    alt="color image"
                    src={transImageUrl(color_image)}
                  ></img>
                ))}
            </div>
          </div>
        </div>
        <div className="row g-5 fs-6-sm p-4 text-textblue">
          <div className="col-4 border-end border-2">
            <Box>
              <Title>型號</Title>
              <Col>{stock?.code}</Col>
            </Box>
            <Box>
              <Title>系列</Title>
              <Col>{stock?.series?.name}</Col>
            </Box>
            <Box>
              <Title>面料材質</Title>
              <Col>
                {stock?.material &&
                  toArray(stock.material).reduce(
                    (text, item, index) =>
                      `${text}${index === 0 ? "" : "，"}${item.name}`,
                    ""
                  )}
              </Col>
            </Box>
          </div>
          <div className="col-3 border-end border-2">
            <Box>
              <Title>遮光效果</Title>
              <Col>
                <Stars number={stock?.block} />
              </Col>
            </Box>
            <Box>
              <Title>吸音效果</Title>
              <Col>
                <Stars number={stock?.absorption} />
              </Col>
            </Box>
          </div>
          <div className="col-5">
            <Row>
              <Title className="col-auto">描述</Title>
              <Col>{stock?.description}</Col>
            </Row>
          </div>
        </div>
      </div>
  );
};

export default ExportTemplate;
