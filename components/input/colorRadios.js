import { Row, Col } from "react-bootstrap";
import ColorRadio from "@/components/input/colorRadio";

import { transImageUrl } from "@/tool/lib";

const mockColorsData = [
  {
    name: "海藻",
    id: 0,
  },
  {
    name: "板木",
    id: 1,
  },
  {
    name: "海苔",
    id: 2,
  },
  {
    name: "蘇丹紅",
    id: 3,
  },
  {
    name: "頁岩",
    id: 4,
  },
];

const ColorRadios = ({
  colors = mockColorsData,
  radioname,
  checkfirst,
  onInput,
  onClick,
  checkable = true,
}) => {
  return (
    <Row className="row-cols-3 row-cols-xxl-5">
      {colors.map((color, index) => (
        <Col className="p-0" key={color.id}>
          <ColorRadio
            name={radioname}
            label={color.name}
            disabled={!checkable}
            src={transImageUrl(color.color_image) || "/color_check/red.jpg"}
            {...(checkfirst && { defaultChecked: index === 0 })}
            {...(typeof onClick === "function" && {onClick: (e) => onClick(e, { ...color, index })})}
            {...(typeof onInput === "function" && {onInput: (e) => onInput(e, { ...color, index })})}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ColorRadios;
