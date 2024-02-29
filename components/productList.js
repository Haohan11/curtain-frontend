import Image from "next/image";
import { Col, FormSelect, Row } from "react-bootstrap";

import Cross from "@/icon/cross";

const ProductList = () => {
  return (
    <Row className="row-cols-5 p-3 px-2 g-0 justify-content-around">
      {[...new Array(5)].map((_, index) => (
        <Col key={index} className="px-2" style={{maxWidth: "185px"}}>
          <div
            className="position-relative w-100"
            style={{ aspectRatio: "185 / 120" }}
          >
            <Image alt="product image" src={"/image/xmas.jpg"} fill />
          </div>
          <p className="p-2 m-0 text-center text-darkblue fw-bold">
            Product name
          </p>
          <FormSelect className="text-textgrey">
            <option>選擇顏色</option>
          </FormSelect>
          <div className="flex-center fw-bold text-checkboxblue py-2">
            <div className="cursor-pointer">
              <Cross />
              <span className="ms-2">加入組合</span>
            </div>
          </div>
        </Col>
      ))}

    </Row>
  );
};

export default ProductList;
