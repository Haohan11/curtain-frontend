import { Row, Col } from "react-bootstrap";
import FormInput from "@/components/input/formInput";
import Image from "next/image";

import Logo from "@/icon/logoWhiteSvg";
import ReturnButton from "@/components/returnButton";
import CombinationCard from "@/components/combinationCard";
import Pagination from "@/components/pagination";
import Cross from "@/icon/cross";
import Search from "@/icon/search";

import copyrightText from "@/data/copyrightText";

const mockCombinationData = [
  {
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
  },
  {
    combination_name: "提案組合B",
    image: "/image/white_room.jpg",
    env_name: "臥室",
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
    ],
  },
  {
    combination_name: "提案組合C",
    image: "/image/yellow_room.jpg",
    env_name: "廚房",
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
  },
];

const ProposalPage = () => {
  return (
    <Row className="g-0">
      <Col sm={"auto"} className="d-none d-md-block">
        <div className="vh-100 position-relative p-6">
          <Image
            alt="curtain image"
            sizes="120px"
            priority
            fill
            src={"/image/curtain.jpg"}
          />
          <Logo className="position-relative" />
        </div>
      </Col>
      <Col>
        <div className="vh-100 position-relative overflow-y-auto">
          <div className="position-sticky top-0 z-2 p-6 flex-center justify-content-between border-bottom bg-white">
            <ReturnButton href={"/"} />
          </div>
          <div className="position-relative p-8" style={{ minHeight: "85vh" }}>
            <div className="hstack justify-content-between">
              <span className="fs-1-sm fw-bold text-darkblue">
                我的提案組合
              </span>
              <div style={{ width: "300px" }} className="position-relative">
                <FormInput placeholder="搜尋" className="pe-8" />
                <div className="position-absolute top-0 end-0 text-linegrey p-2">
                  <Search />
                </div>
              </div>
            </div>
            {mockCombinationData.map((data, index) => (
              <CombinationCard key={index} data={data} />
            ))}
            <div style={{ height: "250px" }}></div>
            <div className="position-absolute bottom-0 w-100 ms--8  mb--8">
              <Pagination />
              <div className="mt-12 flex-center py-6 text-textgrey">
                {copyrightText}
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProposalPage;
