import Image from "next/image";
import { Col, Row, Button } from "react-bootstrap";

import TrashCan from "@/icon/trashcan";
import ProductCard from "@/components/productCard";
import SubmitButton from "@/components/input/submitButton";

const mockCombinationData = {
  combination_name: "提案組合A",
  image: "/image/dark_room.jpg",
  env_name: "客廳",
  created_at: "2024/1/11 15:23",
  data: [
    {
      product_name: "Product name",
      model: "product model",
      series: "product series",
      colors: [
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
      ],
      description:
        "沉穩素雅設計，妝點室內氣息。 內附調整型掛勾，可調節窗簾長度，自由決定是否露出軌道。並讓擺折曲線更加美觀。",
      material: "product material",
      absorption_rate: "5",
      blocking_rate: "2",
    },
    {
      product_name: "Premium Chair",
      model: "PCH-2000",
      series: "Luxury Collection",
      colors: [
        {
          name: "Royal Blue",
          image_url: "/color_check/blue.jpg",
          id: 0,
        },
        {
          name: "Velvet Red",
          image_url: "/color_check/red.jpg",
          id: 1,
        },
        {
          name: "Ebony Black",
          image_url: "/color_check/green.jpg",
          id: 2,
        },
        {
          name: "Champagne Gold",
          image_url: "/color_check/brown.jpg",
          id: 3,
        },
      ],
      description:
        "Experience unparalleled comfort and style with our Premium Chair from the Luxury Collection. The sophisticated design enhances any interior, and the adjustable hanging hooks allow you to customize the curtain length, revealing or concealing the track as desired.",
      material: "High-quality Upholstery",
      absorption_rate: "4",
      blocking_rate: "3",
    },
  ],
};

const CombinationCard = ({ data = mockCombinationData }) => {
  return (
    <div className="px-5 mt-12 pb-8">
      <Row className="g-10 border-bottom pb-12">
        <Col sm={"auto"} className="ps-0">
          <Image
            alt="combination image"
            src={data.image}
            className="rounded-3"
            width={120}
            height={120}
          />
        </Col>
        <Col className="pe-0">
          <div className="d-flex mb-4 mt-4">
            <div>
              <span className="fs-5 fw-bold text-darkblue">
                {data.combination_name}
              </span>
              <div className="text-textgrey fs-6-sm mt-1 mb-2">
                <span className="d-inline-block" style={{ width: "90px" }}>
                  建立日期
                </span>
                <span>{data.created_at}</span>
              </div>
              <div className="text-textgrey">
                <span className="d-inline-block" style={{ width: "90px" }}>
                  提案場景
                </span>
                <span className="text-darkblue fw-bold">{data.env_name}</span>
              </div>
            </div>
            <div className="ms-auto flex-center align-self-start">
              <SubmitButton type="button" className="px-9">
                開啟提案
              </SubmitButton>
              <div className="ms-6 me-4 text-red cursor-pointer">
                <TrashCan />
              </div>
            </div>
          </div>
          <div className="vstack">
            {data.data.map((data, index) => (
              <div key={index} className="mb-4 border rounded-3">
                <ProductCard data={data} dynamic />
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CombinationCard;
