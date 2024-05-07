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

const ColorRadios = ({ colors = mockColorsData, radioname, checkfirst, onInput }) => {
  return (
    <Row className="row-cols-3 row-cols-xxl-5">
      {colors.map(({ id, name, color_image }, index) => (
        <Col className="p-0" key={id}>
          <ColorRadio
            name={radioname}
            label={name}
            src={transImageUrl(color_image) || "/color_check/red.jpg"}
            {...(checkfirst ? { defaultChecked: index === 0 } : {})}
            onInput={(e) => onInput(e, {id, name, color_image, index})}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ColorRadios;
