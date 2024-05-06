import { useContext } from "react";

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

import addClassName from "@/tool/addClassName";

const Span = addClassName(CompDiv, "d-inline text-textgrey");
const InfoRow = addClassName(Row, "g-0 pb-2");

const cardHeadClassName = "p-4 pb-0";
const cardHeadStyle = { top: "66px" };
const cardTitleClassName = "pb-2 fs-6 m-0 fw-bold text-darkblue";
const stickyClassName = "position-sticky bg-white z-1 rounded-3";

const FoldButton = ({ eventKey, ...props }) => {
  const fold = useAccordionButton(eventKey, (event) => {
    event.preventDefault()
  });
  const { activeEventKey } = useContext(AccordionContext);

  const isMe = activeEventKey === eventKey;
  const ToggleButton = isMe
    ? addClassName(SubtractCube, "text-textgrey")
    : addClassName(AddCube, "text-checkboxblue");

  return <ToggleButton {...props} onClick={fold} />;
};

const ProductCard = ({
  data: {
    id,
    product_name,
    code,
    series,
    colors,
    description,
    material,
    blocking_rate,
    absorption_rate,
    index,
  },
  dynamic,
  checkable,
  deletable,
  sticky,
}) => {
  const handledelete = event => event.preventDefault()
  return (
    <Accordion
      key={`pc_${dynamic}_${index}`}
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
              />
            ) : (
              <Curtain className="me-2 text-linegrey" />
            )}
            {product_name}
            <FoldButton eventKey="0" className="ms-auto cursor-pointer" />
            {deletable && <TrashCan className="ms-2 text-red cursor-pointer" onClick={handledelete} />}
          </div>
        </FormLabel>
      ) : (
        <div
          className={`${sticky && stickyClassName} ${cardHeadClassName}`}
          style={cardHeadStyle}
        >
          <p className={cardTitleClassName}>{product_name}</p>
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
              <ColorRadios colors={colors} />
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
      </Accordion.Collapse>
    </Accordion>
  );
};

export default ProductCard;
