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

import addClassName from "@/tool/addClassName";
import {
  getStockData,
  getEnvironmentData,
  getMaterialData,
  getDesignData,
  getColorSchemeData,
  getCombinations,
} from "@/tool/request";
import { transImageUrl } from "@/tool/lib";

import { useCombination } from "@/hook/provider/combinationProvider";

const SearchPannel = dynamic(
  async () => await import("@/components/searchPannel"),
  { ssr: false }
);

const Row = addClassName(BSRow, "g-0");

function getColorImage() {
  return this.stock?.colorList?.[this.colorIndex ?? 0]?.color_image;
}

export default function Home({
  stockData,
  envData,
  combinationData,
  designData,
  materialData,
  colorSchemeData,
}) {
  const [loginState, setLoginState] = useState(true);
  const login = () => setLoginState(true);
  // const logout = () => setLoginState(false);
  const logout = () => signOut({ callbackUrl: "/login" });

  const { combination } = useCombination();
  const [envId, setEnvId] = useState(
    combination.environment_id ?? envData?.[0]?.id
  );
  const currentEnv =
    (envData.find((env) => env.id === envId) || envData[0]) ?? {};
  const { name: env_name, env_image, mask_image } = currentEnv;

  // hold for export template
  const [selectStock, setSelectStock] = useState({
    stock: combination.stockList?.[0] || stockData.data?.[0] || null,
    colorIndex: 0,
    getColorImage,
  });
  const color_image = selectStock.getColorImage();

  return (
    <>
      <Navbar
        {...{
          isLogin: loginState,
          login,
          logout,
          envData,
          currentEnv,
          setEnvId,
          selectStock,
          combinationData,
        }}
      />
      <Row className="m-0" style={{ height: "var(--main-section-height)" }}>
        <Col sm={3} className="p-0 h-100 overflow-y-auto scroll">
          <LeftSide
            {...{
              data: combination.stockList,
              selectStock,
              setSelectStock,
            }}
          />
        </Col>
        <Col className="p-0 bg-linegrey">
          <div className="position-relative h-100 flex-center overflow-hidden">
            <div
              className="position-relative h-100"
              style={{ aspectRatio: "16 / 9" }}
            >
              {transImageUrl(env_image) && (
                <Image
                  alt="enviroment image"
                  className="object-fit-contain"
                  priority
                  fill
                  sizes="70vw"
                  src={transImageUrl(env_image)}
                />
              )}
              <Image
                alt="mask image"
                className="object-fit-cover"
                priority
                fill
                sizes="70vw"
                src={transImageUrl(color_image)}
                style={{
                  backgroundColor: "#222",
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
          <SearchPannel {...{ designData, materialData, colorSchemeData }} />
        </Col>
        <Col className="h-100 overflow-y-auto">
          <StockList {...{ data: stockData, setSelectStock, selectStock }} />
        </Col>
      </Row>
      <ExportTemplate
        // trigger render when color select
        key={selectStock.colorIndex}
        data={{
          stock: selectStock.stock,
          colorIndex: selectStock.colorIndex,
          color_image: selectStock.getColorImage(),
          env_name,
          env_image,
          mask_image,
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
    ...context?.query,
    size: 5,
    resolvedUrl: context?.resolvedUrl,
  })) || {
    total: 0,
    totalPages: 0,
    data: [],
  };
  const envData = (await getEnvironmentData(accessToken)) || [];
  const designData = (await getDesignData(accessToken)) || [];
  const materialData = (await getMaterialData(accessToken)) || [];
  const colorSchemeData = (await getColorSchemeData(accessToken)) || [];
  const { list: combinationData } = (context?.query?.showMode &&
    (await getCombinations(accessToken, {}))) || { list: [] };

  return {
    props: {
      stockData,
      envData,
      designData,
      materialData,
      colorSchemeData,
      combinationData,
    },
  };
};
