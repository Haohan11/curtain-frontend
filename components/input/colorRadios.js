import { Row, Col } from "react-bootstrap";
import ColorRadio from "@/components/input/colorRadio";

import { transImageUrl } from "@/tool/lib";

const mockColorsData = [
  {
    name: "海藻",
    color_image: "/color_check/blue.jpg",
    id: 0,
  },
  {
    name: "板木",
    color_image: "/color_check/brown.jpg",
    id: 1,
  },
  {
    name: "海苔",
    color_image: "/color_check/green.jpg",
    id: 2,
  },
  {
    name: "蘇丹紅",
    color_image: "/color_check/red.jpg",
    id: 3,
  },
  {
    name: "頁岩",
    color_image: "/color_check/grey.jpg",
    id: 4,
  },
];

const ColorRadios = ({ colors = mockColorsData }) => {
  return (
    <Row className="row-cols-3 row-cols-xxl-5">
      {colors.map(({ id, name, color_image }, index) => (
        <Col className="p-0" key={id || index}>
          <ColorRadio id={id} name={"color"} label={name} src={transImageUrl(color_image)} />
        </Col>
      ))}
    </Row>
  );
};

export default ColorRadios;
