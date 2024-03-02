import { Row, Col } from "react-bootstrap";
import ColorRadio from "@/components/input/colorRadio";

const mockColorsData = [
  {
    name: "海藻",
    image_url: "/color_check/blue.jpg",
    id: 0,
  },
  {
    name: "板木",
    image_url: "/color_check/brown.jpg",
    id: 1,
  },
  {
    name: "海苔",
    image_url: "/color_check/green.jpg",
    id: 2,
  },
  {
    name: "蘇丹紅",
    image_url: "/color_check/red.jpg",
    id: 3,
  },
  {
    name: "頁岩",
    image_url: "/color_check/grey.jpg",
    id: 4,
  },
//   {
//     name: "Royal Blue",
//     image_url: "/color_check/blue.jpg",
//     id: 5,
//   },
//   {
//     name: "Velvet Red",
//     image_url: "/color_check/red.jpg",
//     id: 6,
//   },
//   {
//     name: "Ebony Black",
//     image_url: "/color_check/green.jpg",
//     id: 7,
//   },
//   {
//     name: "Champagne Gold",
//     image_url: "/color_check/brown.jpg",
//     id: 8,
//   },
];

const ColorRadios = ({ colors = mockColorsData }) => {
  return (
    <Row className="row-cols-3">
      {colors.map(({ id, name, image_url }, index) => (
        <Col className="text-center" key={id || index}>
          <ColorRadio id={id} name={"color"} label={name} src={image_url} />
        </Col>
      ))}
    </Row>
  );
};

export default ColorRadios;
