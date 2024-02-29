import { useContext } from "react";

import {
  Col,
  Row as BSRow,
  FormCheck,
  FormLabel,
  Accordion,
  AccordionContext,
  useAccordionButton,
} from "react-bootstrap";

import ColorRadio from "@/components/input/colorRadio";
import CompDiv from "@/components/Div";
import Stars from "@/components/staticStars";

import TrashCan from "@/icon/trashcan";
import SubtractCube from "@/icon/subtract-border";
import AddCube from "@/icon/add-border";

import addClassName from "@/tool/addClassName";

const Span = addClassName(CompDiv, "d-inline text-textgrey");
const Row = addClassName(BSRow, "g-0 m-0 p-0");
const InfoRow = addClassName(BSRow, "g-0 pb-2");

const cardHeadClassName = "p-4 pb-0 position-sticky bg-white z-1";
const cardHeadStyle = { top: "66px" };
const cardTitleClassName = "pb-3 fs-6 m-0 fw-bold text-darkblue dashed";

const FoldButton = ({ eventKey, ...props }) => {
  const fold = useAccordionButton(eventKey);
  const { activeEventKey } = useContext(AccordionContext);

  const isMe = activeEventKey === eventKey;
  const ToggleButton = isMe ? addClassName(SubtractCube, "text-textgrey") : addClassName(AddCube, "text-checkboxblue")

  return <ToggleButton {...props} onClick={fold} />
};

const ProductCard = ({
  data: {
    id,
    product_name,
    model,
    series,
    colors,
    description,
    material,
    blocking_rate,
    absorption_rate,
    index,
  },
  dynamic,
}) => {
  return (
    <Accordion defaultActiveKey="0">
      {dynamic ? (
        <FormLabel
          className={`w-100 cursor-pointer ${cardHeadClassName}`}
          style={cardHeadStyle}
        >
          <div className={`d-flex ${cardTitleClassName}`}>
            <FormCheck
              className="pe-none"
              type="radio"
              inline
              defaultChecked={index === 0}
              name="product_card"
            ></FormCheck>
            {product_name}
            <FoldButton
              eventKey="0"
              className="ms-auto cursor-pointer"
            />
            <TrashCan className="ms-2 text-red cursor-pointer" />
          </div>
        </FormLabel>
      ) : (
        <div className={cardHeadClassName} style={cardHeadStyle}>
          <p className={cardTitleClassName}>{product_name}</p>
        </div>
      )}
      <Accordion.Collapse eventKey="0">
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
      </Accordion.Collapse>
    </Accordion>
  );
};

export default ProductCard;
