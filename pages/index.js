import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Row as BSRow, Col } from "react-bootstrap";
import { signOut, getSession } from "next-auth/react";

import Navbar from "@/components/navbar";
import LeftSide from "@/components/leftSide";
import StockList from "@/components/stockList";
import ExportTemplate from "@/components/exportTamplate";

import { checkExpires } from "@/tool/lib";

// current only ref by exportTemplate
import productData from "@/data/productData";
import addClassName from "@/tool/addClassName";
import { getStockData, getEnvironmentData } from "@/tool/request";
import { transImageUrl } from "@/tool/lib";

import { useCombination } from "@/hook/provider/combinationProvider";

const SearchPannel = dynamic(
  async () => await import("@/components/searchPannel"),
  { ssr: false }
);

const Row = addClassName(BSRow, "g-0");

export default function Home({ stockData, envData }) {
  const [loginState, setLoginState] = useState(true);
  const login = () => setLoginState(true);
  // const logout = () => setLoginState(false);
  const logout = () => signOut({ callbackUrl: "/login" });

  const { combination } = useCombination();
  const [envId, setEnvId] = useState(
    combination.environment_id ?? envData?.[0]?.id
  );
  const {
    name: envName,
    env_image,
    mask_image,
  } = envData.find((env) => env.id === envId) ?? {};

  const [currentSelect, setCurrentSelect] = useState({
    stock: combination.stockList?.[0] || stockData.data?.[0] || null,
    colorIndex: 0,
    getColorImage() {
      return this.stock?.colorList?.[this.colorIndex ?? 0]?.color_image;
    },
  });
  const color_image = currentSelect.getColorImage();

  // current select stock id
  const [product, setProduct] = useState(0);

  return (
    <>
      <Navbar
        isLogin={loginState}
        {...{
          login,
          logout,
          envData,
          envId,
          setEnvId,
        }}
      />
      <Row className="m-0" style={{ height: "var(--main-section-height)" }}>
        <Col sm={3} className="p-0 h-100 overflow-y-auto scroll">
          <LeftSide
            isLogin={loginState}
            data={combination.stockList}
            setCurrentSelect={setCurrentSelect}
          />
        </Col>
        <Col className="p-0 bg-linegrey">
          <div className="position-relative h-100 flex-center overflow-hidden">
            <div
              className="position-relative h-100"
              style={{ aspectRatio: "16 / 9" }}
            >
              <Image
                alt="enviroment image"
                className="object-fit-contain"
                fill
                placeholder="blur"
                blurDataURL={
                  transImageUrl(env_image) || "/image/livingroom.jpg"
                }
                sizes="70vw"
                src={transImageUrl(env_image) || "/image/livingroom.jpg"}
              />
              <Image
                alt="mask image"
                className="object-fit-cover"
                priority
                fill
                sizes="70vw"
                src={transImageUrl(color_image) || "/image/livingroom.jpg"}
                style={{
                  maskImage: `url('${transImageUrl(mask_image)}')`,
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                }}
              />
            </div>
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
          <StockList data={stockData} setCurrentSelect={setCurrentSelect} />
        </Col>
      </Row>
      <ExportTemplate
        data={{
          envName,
          product: (() => {
            const { data } = productData.find((data) => data.id === product);
            return data;
          })(),
        }}
      />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session || checkExpires(session._exp)) {
    return {
      redirect: { destination: "/login" },
    };
  }
  const accessToken = session.user.accessToken;
  const stockData = (await getStockData(accessToken, {
    ...context?.query?.page,
    size: 5,
  })) || {
    total: 0,
    totalPages: 0,
    data: [],
  };
  const envData = (await getEnvironmentData(accessToken)) || [];

  return {
    props: {
      stockData,
      envData,
    },
  };
};
