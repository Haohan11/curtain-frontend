import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Row as BSRow, Col } from "react-bootstrap";
import { signOut, getSession } from "next-auth/react";

import loadingDataUrl from "@/data/loadingDataUrlTrans";

import Navbar from "@/components/navbar";
import LeftSide from "@/components/leftSide";
import StockList from "@/components/stockList";
import ExportTemplate from "@/components/exportTamplate";

import { checkExpires, getMatirx3dText, isJson } from "@/tool/lib";

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

  const [envImgLoading, setEnvImgLoading] = useState(null);
  const [colorImgLoading, setColorImgLoading] = useState(null);

  const [frame, setFrame] = useState();

  const { combination } = useCombination();
  const [envId, setEnvId] = useState(
    combination.environment_id ?? envData?.[0]?.id
  );
  const currentEnv =
    (envData.find((env) => env.id === envId) || envData[0]) ?? {};
  const { name: env_name, env_image, mask_image, css_matrix } = currentEnv;
  const perspect =
    isJson(currentEnv.perspect) && JSON.parse(currentEnv.perspect);

  // hold for export template
  const [selectStock, setSelectStock] = useState({
    stock: combination.stockList?.[0] || stockData.data?.[0] || null,
    colorIndex: 0,
    getColorImage,
  });
  const color_image = selectStock.getColorImage();

  useEffect(() => {
    envImgLoading !== null && setEnvImgLoading(true);
  }, [env_image]);

  useEffect(() => {
    colorImgLoading !== null && setColorImgLoading(true);
  }, [color_image]);

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
      <Row
        className="m-0 position-relative z-2 bg-white"
        style={{ height: "var(--main-section-height)" }}
      >
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
              ref={setFrame}
              className="position-relative h-100"
              style={{ aspectRatio: "16 / 9" }}
            >
              {transImageUrl(env_image) && (
                <img
                  className="position-absolute h-100 w-100 top-0 start-0 object-fit-contain"
                  onLoad={() => setEnvImgLoading(false)}
                  alt="enviroment image"
                  src={transImageUrl(env_image)}
                />
              )}
              <div
                className="position-absolute w-100 h-100 pe-none overflow-hidden"
                style={{
                  top: 0,
                  left: 0,
                  maskImage: `url('${transImageUrl(mask_image)}')`,
                  maskRepeat: "no-repeat",
                  maskSize: "contain",
                }}
              >
                <div
                  className="position-absolute"
                  style={{
                    width: "50%",
                    height: "50%",
                    top: "25%",
                    left: "25%",
                  }}
                >
                  {frame?.clientWidth && Array.isArray(perspect) && perspect.map(({ width, originalPos, targetPos }, index) => (
                    <div
                      key={index}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: "0",
                        left: "0",
                        transformOrigin: "0 0",
                        transform: getMatirx3dText(
                          originalPos.map(([x, y ]) => ([
                            frame.clientWidth / width * x,
                            frame.clientWidth / width * y,
                          ])),
                          targetPos.map(({ x, y }) => ([
                            frame.clientWidth / width * x,
                            frame.clientWidth / width * y,
                          ]))
                        ),
                        backgroundImage: `url('${transImageUrl(color_image)}')`,
                        backgroundRepeat: "no-repeat"
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            {(envImgLoading || colorImgLoading) && (
              <div className="position-absolute h-100 w-100 flex-center top-0 left-0">
                <div
                  className="position-relative"
                  style={{ width: "50px", height: "50px" }}
                >
                  <Image alt="loading-img" fill src={loadingDataUrl} />
                </div>
              </div>
            )}
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
  const { list: combinationData } =
    context?.query?.showMode === false
      ? { list: [] }
      : (await getCombinations(accessToken, {})) || { list: [] };

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
