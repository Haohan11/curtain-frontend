import Image from "next/image";
import { Col, Row } from "react-bootstrap";

import Pagination from "@/components/pagination";
import ColorRadio from "./input/colorRadio";
import Cross from "@/icon/cross";

const ProductList = () => {
  return (
    <div className="position-relative h-100" style={{ minHeight: "350px" }}>
      <Row
        className="row-cols-5 pt-3 px-2 g-1 justify-content-evenly mx-auto"
        style={{ maxWidth: "1080px" }}
      >
        {[...new Array(5)].map((_, index) => (
          <Col key={index} style={{ maxWidth: "185px" }}>
            <div
              className="position-relative w-100"
              style={{ aspectRatio: "185 / 120" }}
            >
              <Image
                alt="product image"
                sizes="185px"
                src={"/image/xmas.jpg"}
                fill
              />
            </div>
            <p className="p-2 m-0 text-center text-darkblue fw-bold">
              Product name
            </p>
            <div className="hstack justify-content-around">
              {[...new Array(5)].map((_, colorIndex) => (
                <ColorRadio key={colorIndex} id={colorIndex + 1} name={`color_${index}`} />
              ))}
            </div>
            <div className="flex-center fw-bold text-checkboxblue py-2">
              <div className="cursor-pointer">
                <Cross />
                <span className="fs-6-sm ms-2">加入組合</span>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Pagination />
    </div>
  );
};

export default ProductList;
