import Image from "next/image";
import { Col, Row } from "react-bootstrap";

import Pagination from "@/components/pagination";
import ColorRadio from "./input/colorRadio";
import Cross from "@/icon/cross";

import { transImageUrl } from "@/tool/lib";

const StockList = ({ data }) => {
  const { totalPages, data: list } = data;

  return (
    <div className="position-relative h-100" style={{ minHeight: "350px" }}>
      <Row
        className="row-cols-5 pt-3 px-2 g-1 justify-content-evenly mx-auto"
        style={{ maxWidth: "1080px" }}
      >
        {list.map((item, index) => (
          <Col key={item.id} style={{ maxWidth: "185px" }}>
            <div
              className="position-relative w-100 rounded-3 overflow-hidden shadow-sm"
              style={{ aspectRatio: "185 / 120" }}
            >
              <Image
                alt="stock image"
                className="object-fit-cover"
                sizes="185px"
                src={
                  transImageUrl(item.colorList?.[0]?.stock_image) ||
                  "/image/xmas.jpg"
                }
                fill
              />
            </div>
            <p className="p-2 m-0 text-center text-darkblue fw-bold">
              {item.name ?? "Product Name"}
            </p>
            <div className="hstack justify-content-around">
              {!item.colorList || item.colorList.length === 0 ? (
                <span className="text-textgrey">目前沒有商品顏色</span>
              ) : (
                item.colorList.map((color) => (
                  <ColorRadio
                    key={color.id}
                    name={item.id}
                    // label={color.name}
                    src={transImageUrl(color.color_image)}
                  />
                ))
              )}
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
      <Pagination totalPage={totalPages} />
    </div>
  );
};

export default StockList;