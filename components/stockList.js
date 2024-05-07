import Image from "next/image";
import { Col, Row } from "react-bootstrap";

import Pagination from "@/components/pagination";
import ColorRadio from "./input/colorRadio";
import Cross from "@/icon/cross";

import { transImageUrl } from "@/tool/lib";

import { useCombination } from "@/hook/provider/combinationProvider";

const StockList = ({ data, setCurrentSelect }) => {
  const { totalPages, data: list } = data;
  const { combination, setCombination } = useCombination();

  const addToCombination = (stock) => {
    if (combination.stockIdCache.has(stock.id)) return;
    setCombination((prev) => ({
      ...prev,
      stockIdCache: prev.stockIdCache.add(stock.id),
      stockList: [...prev.stockList, stock],
    }));
  };

  return (
    <div className="position-relative h-100" style={{ minHeight: "350px" }}>
      <Row
        className="row-cols-5 pt-3 px-2 g-1 justify-content-evenly mx-auto"
        style={{ maxWidth: "1080px" }}
      >
        {list.map((item) => (
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
                item.colorList.map((color, index) => (
                  <ColorRadio
                    key={color.id}
                    name={`stocklist_${item.id}`}
                    src={transImageUrl(color.color_image)}
                    onClick={() => setCurrentSelect(prev => ({...prev, stock: item, colorIndex: index}))}
                  />
                ))
              )}
            </div>
            <div className="flex-center fw-bold text-checkboxblue py-2">
              <div
                className="cursor-pointer"
                onClick={() => addToCombination(item)}
              >
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
