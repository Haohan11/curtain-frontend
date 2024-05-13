import { useRouter } from "next/router";
import Image from "next/image";

import { Col, Row } from "react-bootstrap";

import Pagination from "@/components/pagination";
import ColorRadio from "@/components/input/colorRadio";
import Cross from "@/icon/cross";
import { transImageUrl } from "@/tool/lib";

import { useCombination } from "@/hook/provider/combinationProvider";

const StockList = ({ data, setSelectColor, setSelectStock }) => {
  const router = useRouter();
  const { totalPages, data: list } = data;
  const { combination, addToCombination } = useCombination();

  return (
    <div className="position-relative py-3 d-flex flex-column h-100 justify-content-between">
      <Row
        className="w-100 row-cols-5 px-2 g-1 justify-content-evenly mx-auto"
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
            <p className="py-2 m-0 text-center text-darkblue fw-bold">
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
                    onClick={() =>
                      setSelectColor((prev) => ({
                        ...prev,
                        stock: item,
                        colorIndex: index,
                      }))
                    }
                  />
                ))
              )}
            </div>
            <div className="flex-center fw-bold text-checkboxblue py-2">
              <div
                className="cursor-pointer"
                onClick={() => {
                  (!combination.stockList ||
                    combination.stockList.length === 0) &&
                    setSelectStock((prev) => ({
                      ...prev,
                      stock: item,
                      colorIndex: 0,
                    }));
                  addToCombination(item);
                }}
              >
                <Cross />
                <span className="fs-6-sm ms-2">加入組合</span>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Pagination
        totalPage={totalPages}
        defaultPage={router.query?.page}
        onPageChange={(page) => {
          router.push({ query: { ...router.query, page } });
        }}
      />
    </div>
  );
};

export default StockList;
