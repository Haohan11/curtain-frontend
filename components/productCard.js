import { useContext, useRef, useState } from "react";

import {
  Col,
  Row,
  FormCheck,
  FormLabel,
  Accordion,
  AccordionContext,
  useAccordionButton,
} from "react-bootstrap";

import ColorRadios from "@/components/input/colorRadios";
import CompDiv from "@/components/Div";
import Stars from "@/components/staticStars";

import TrashCan from "@/icon/trashcan";
import SubtractCube from "@/icon/subtract-border";
import AddCube from "@/icon/add-border";
import Curtain from "@/icon/curtain";
import ModalWrapper from "./modalWrapper";
import PopUp from "./popUp";

import addClassName from "@/tool/addClassName";
import { toArray } from "@/tool/lib";
import useModals from "@/hook/useModals";

const Span = addClassName(CompDiv, "d-inline text-textgrey");
const InfoRow = addClassName(Row, "g-0 pb-2");

const cardHeadClassName = "p-4 pb-0";
const cardHeadStyle = { top: "66px" };
const cardTitleClassName = "pb-2 fs-6 m-0 fw-bold text-darkblue";
const stickyClassName = "position-sticky bg-white z-1 rounded-3";

const FoldButton = ({ eventKey, ...props }) => {
  const fold = useAccordionButton(eventKey, (event) => {
    event.preventDefault();
  });
  const { activeEventKey } = useContext(AccordionContext);

  const isMe = activeEventKey === eventKey;
  const ToggleButton = isMe
    ? addClassName(SubtractCube, "text-textgrey")
    : addClassName(AddCube, "text-checkboxblue");

  return <ToggleButton {...props} onClick={fold} />;
};

const ProductCard = ({
  data,
  dynamic,
  checkable,
  deletable,
  sticky,
  onClickLabel,
  onInputLabel,
  onClickColor,
  onInputColor,
  onDelete,
  colorCheckable = true,
}) => {
  const {
    name,
    id,
    index,
    code,
    series: { name: series },
    material,
    colorList,
    description,
    absorption,
    block,
  } = data;

  const colorIndexRef = useRef(0);
  const { handleShowModal, handleCloseModal, isModalOpen } = useModals();
  return (
    <Accordion
      key={`pc_${dynamic}_${id}`}
      defaultActiveKey={index === 0 || !dynamic ? "0" : undefined}
    >
      {dynamic ? (
        <FormLabel
          className={`w-100 ${checkable && "cursor-pointer"} ${
            sticky && stickyClassName
          } ${cardHeadClassName}`}
          style={cardHeadStyle}
        >
          <div className={`d-flex ${cardTitleClassName}`}>
            {checkable ? (
              <FormCheck
                className="pe-none"
                type="radio"
                inline
                defaultChecked={index === 0}
                name="product_card"
                {...(typeof onClickLabel === "function" && {
                  onClick: (e) =>
                    onClickLabel(e, { colorIndex: colorIndexRef.current }),
                })}
                {...(typeof onInputLabel === "function" && {
                  onInput: (e) =>
                    onInputLabel(e, { colorIndex: colorIndexRef.current }),
                })}
              />
            ) : (
              <Curtain className="me-2 text-linegrey" />
            )}
            {name || "Product Name"}
            <FoldButton eventKey="0" className="ms-auto cursor-pointer" />
            {deletable && (
              <TrashCan
                className="ms-2 text-red cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  handleShowModal("wantDelete");
                }}
              />
            )}
          </div>
        </FormLabel>
      ) : (
        <div
          className={`${sticky && stickyClassName} ${cardHeadClassName}`}
          style={cardHeadStyle}
        >
          <div className="pb-3">{name || "Product Name"}</div>
        </div>
      )}
      <Accordion.Collapse eventKey="0">
        <div className="p-4 pt-0 text-textblue">
          <div className="dashed mb-4"></div>
          <InfoRow>
            <Col sm={4}>
              <Span>型號</Span>
            </Col>
            <Col>
              <div className="">{code}</div>
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
              <ColorRadios
                colors={colorList}
                radioname={"stock-color"}
                checkable={colorCheckable}
                {...(typeof onClickColor === "function" && {
                  onClick: (e, color) => {
                    onClickColor(e, color);
                    colorIndexRef.current = color.index;
                  },
                })}
                {...(typeof onInputColor === "function" && {
                  onInput: (e, color) => {
                    onInputColor(e, color);
                    colorIndexRef.current = color.index;
                  },
                })}
              />
            </Col>
          </InfoRow>
          {description && (
            <InfoRow>
              <Col sm={4}>
                <Span>描述</Span>
              </Col>
              <Col>
                <div>{description}</div>
              </Col>
            </InfoRow>
          )}
          <InfoRow>
            <Col sm={4}>
              <Span>面料材質</Span>
            </Col>
            <Col>
              <div>
                {toArray(material).reduce(
                  (text, item, index) =>
                    `${text}${index === 0 ? "" : "，"}${item.name}`,
                  ""
                )}
              </div>
            </Col>
          </InfoRow>
          <InfoRow>
            <Col sm={4}>
              <Span>遮光效果</Span>
            </Col>
            <Col>
              <Stars number={block} />
            </Col>
          </InfoRow>
          <InfoRow>
            <Col sm={4}>
              <Span>吸音效果</Span>
            </Col>
            <Col>
              <Stars number={absorption} />
            </Col>
          </InfoRow>
        </div>
      </Accordion.Collapse>

      {/*是否刪除*/}
      <ModalWrapper
        key="wantDelete"
        show={isModalOpen("wantDelete")}
        size="lg"
        onHide={() => handleCloseModal("wantDelete")}
      >
        <PopUp
          imageSrc={"/icon/warning.svg"}
          title={"是否要移除該商品?"}
          denyOnClick={() => handleCloseModal("wantDelete")}
          confirmOnClick={() => {
            typeof onDelete === "function" && onDelete();
            handleCloseModal("wantDelete");
          }}
        />
      </ModalWrapper>
    </Accordion>
  );
};

export default ProductCard;
