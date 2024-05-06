import { useState } from "react";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Row as BSRow, Col } from "react-bootstrap";

import Navbar from "@/components/navbar";
import LeftSide from "@/components/leftSide";
// import SearchPannel from "@/components/searchPannel";
import StockList from "@/components/stockList";

import addClassName from "@/tool/addClassName";
import ExportTemplate from "@/components/exportTamplate";

import { useCombination } from "@/hook/provider/combinationProvider";

// current only ref by exportTemplate
import productData from "@/data/productData";

import { getStockData } from "@/tool/request";

const SearchPannel = dynamic(
  async () => await import("@/components/searchPannel"),
  { ssr: false }
);

const Row = addClassName(BSRow, "g-0");

export default function Home({ stockData, envData }) {
  const [loginState, setLoginState] = useState(true);
  const login = () => setLoginState(true);
  const logout = () => setLoginState(false);

  const { combination, setCombination } = useCombination();
  const [env, setEnv] = useState(envData[0]["label"]);

  // current select stock id
  const [product, setProduct] = useState(0);

  // navdata :: handle navdata bellow
  // navData["changeEnv"]["items"] = envData.map((env) => {
  //   env.action = () => setEnv(env.label);
  //   return env;
  // });

  // navData["workMenu"]["items"] = navData["workMenu"]["items"].map((item) => {
  //   if (item.name === "exportImage") {
  //     item.action = () =>
  //       exportImage({
  //         env,
  //         product: (() => {
  //           const { data } = productData.find((data) => data.id === product);
  //           return data;
  //         })(),
  //       });
  //   }

  //   if (item.name === "combination") {
  //     item.link = "/proposal";
  //   }
  //   return item;
  // });

  // navData["workCenter"]["items"] = navData["workCenter"]["items"].map(
  //   (item) => {
  //     if (item.name === "myAccount") {
  //       item.link = "/account";
  //     }
  //     return item;
  //   }
  // );
  // navdata :: handle navdata above

  return (
    <>
      <Navbar
        isLogin={loginState}
        login={login}
        logout={logout}
      />
      <Row className="m-0" style={{ height: "var(--main-section-height)" }}>
        <Col sm={3} className="p-0 h-100 overflow-y-auto scroll">
          <LeftSide isLogin={loginState} data={combination.stockList} />
        </Col>
        <Col className="p-0 bg-linegrey">
          <div className="position-relative h-100">
            <Image
              alt="enviroment image"
              fill
              placeholder="blur"
              blurDataURL="/image/livingroom.jpg"
              sizes="70vw"
              src={"/image/livingroom.jpg"}
              className="object-fit-contain"
            />
            <span className="position-absolute top-0 text-white bg-textgrey p-2 rounded-2 ms-4 mt-3">
              目前環境 : {env}
            </span>
          </div>
        </Col>
      </Row>
      <Row
        className="shadow-lg"
        style={{
          height:
            "calc(100vh - var(--nav-height) - var(--main-section-height))",
        }}
      >
        <Col sm={3} className="h-100">
          <SearchPannel />
        </Col>
        <Col className="h-100 overflow-y-auto">
          <StockList data={stockData} />
        </Col>
      </Row>
      <ExportTemplate
        data={{
          env,
          product: (() => {
            const { data } = productData.find((data) => data.id === product);
            return data;
          })(),
        }}
      />
    </>
  );
}

export const getStaticProps = async () => {
  const stockData = (await getStockData({ page: 1, size: 5 })) || { total: 0, totalPages: 0, list: [] };

  return {
    props: {
      stockData,
      envData: [
        { label: "客廳", name: "livingroom" },
        { label: "臥室", name: "bedroom" },
        { label: "陽台", name: "balcony" },
      ],
    },
  };
};
