import { useState, useRef } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import Leave from "@/icon/leave";
import Logo from "@/icon/logoSvg";
import User from "@/icon/user";
import { Form, FormControl } from "react-bootstrap";
import Select from "@/components/input/select";
import ModalWrapper from "./ModalWrapper";
import PopUp from "./PopUp";

import NavItem from "@/components/navItem";
import exportImage from "@/tool/exportImage";
import { createCombination, updateCombination } from "@/tool/request";

import { useCombination } from "@/hook/provider/combinationProvider";
import { useSession } from "next-auth/react";
import useModals from "@/hook/useModals";

const Bar = () => (
  <span
    className="border-end border-2 me-3"
    style={{ height: "1.8rem" }}
  ></span>
);

const Navbar = ({
  isLogin,
  login,
  logout,
  envData,
  currentEnv,
  setEnvId,
  selectStock,
  combinationData,
}) => {
  const router = useRouter();

  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const showMode =
    ["true", "false"].includes(router.query.showMode) &&
    JSON.parse(router.query.showMode);

  const { handleShowModal, handleCloseModal, isModalOpen } = useModals();

  const { combination, resetCombination, loadCombination } = useCombination();
  const combName = useRef(combination.name);

  const reset = () => {
    resetCombination();
    setNameKey((prev) => prev + 1);
  };

  // for force name input reRender
  const [nameKey, setNameKey] = useState(0);
  const [popupSet, setPopupSet] = useState({ message: "", icon: "" });

  const getHandledCombData = () => {
    try {
      const { id } = combination;
      const name = combName.current;
      const environment_id = currentEnv.id
      if (!environment_id || !name)
        throw new Error(
          `Combination data invalid: envId: ${environment_id}, combination name: ${name}`
        );
      return {
        id,
        name,
        environment_id,
        stockList: JSON.stringify(
          combination.stockList.map((stock) => stock.id)
        ),
      };
    } catch (error) {
      return !!console.log("Failed to handle combination data:", error);
    }
  };

  const navData = {
    operation: {
      navText: "操作",
      items: [
        {
          label: "新增組合",
          action: () => {
            const data = getHandledCombData();
            if (data.stockList === "[]") {
              setPopupSet({
                message: "目前尚無商品",
                icon: "/icon/circle-error.svg",
              });
              handleShowModal("popup");
              return;
            } else {
              handleShowModal("wantReset");
            }
          },
        },
        {
          label: "儲存組合",
          action: async () => {
            const data = getHandledCombData();
            if (!data || !token) {
              return console.log("Fail to create combination.");
            } else if (data.stockList === "[]") {
              setPopupSet({
                message: "目前尚無商品",
                icon: "/icon/circle-error.svg",
              });
              handleShowModal("popup");
              return;
            }
            const mode = data.id === null ? "create" : "edit";
            await {
              async create() {
                await createCombination(token, data);
                reset();
                setPopupSet({
                  message: "已儲存",
                  icon: "/icon/check-circle.svg",
                });

                handleShowModal("popup");
              },
              async edit() {
                await updateCombination(token, data);
                setPopupSet({
                  message: "編輯完成",
                  icon: "/icon/check-circle.svg",
                });
                handleShowModal("popup");
              },
            }[mode]();
          },
        },
      ],
    },
    changeEnv: {
      navText: currentEnv.name || "變更環境",
      items: envData.map((env) => ({
        ...env,
        label: env.name,
        action: () => setEnvId(env.id),
        ...(env.id === currentEnv.id && {textStyle: "text-orange"})
      })),
    },
    workMenu: {
      navText: "工作選單",
      items: [
        {
          label: "我的組合",
          name: "combination",
          link: "/combination",
          action: reset,
        },
        {
          label: "匯出圖檔",
          name: "exportImage",
          action: () => {
            selectStock.stock !== null
              ? exportImage()
              : (() => {
                  setPopupSet({
                    message: "目前尚無商品 無法匯出",
                    icon: "/icon/circle-error.svg",
                  });
                  handleShowModal("popup");
                })();
          },
        },
      ],
    },
    workCenter: {
      navText: "工作中心",
      items: [
        {
          label: "我的帳號",
          name: "myAccount",
          link: "/account",
          action: reset,
        },
      ],
    },
  };

  const getItemsInit = () =>
    new Map(Object.keys(navData).map((name) => [name, false]));

  const [itemsOpen, setItemsOpen] = useState(getItemsInit);
  const toggleOpen = (name) => {
    setItemsOpen((prev) => {
      return prev.get(name) ? getItemsInit() : getItemsInit().set(name, true);
    });
  };

  return (
    <div
      className="hstack ps-6 pe-2 border-bottom border-2 border-linegrey fs-6-sm text-textgrey"
      style={{ height: "var(--nav-height)" }}
    >
      <Logo width={48} />
      {isLogin && (
        <>
          <span className="fw-bold ms-10">展示模式</span>
          <Form.Switch
            className="ms-4 fs-1 model-switch"
            defaultChecked={showMode}
            onInput={(e) => {
              !e.target.checked && combination.id === null && reset();
              router.push({
                query: { ...router.query, showMode: e.target.checked },
              });
            }}
          ></Form.Switch>
          <Bar />
          <span className="fw-bold">{showMode ? "選擇組合" : "當前組合"}</span>
          {showMode ? (
            <Select
              className="ms-4 w-25 z-3"
              instanceId="comb-select"
              isClearable
              defaultValue={
                combination.id
                  ? {
                      label: combination.name,
                      value: combination.id,
                      combination,
                    }
                  : null
              }
              options={combinationData.map((comb) => ({
                label: comb.name,
                value: comb.id,
                combination: comb,
              }))}
              onChange={(option) => {
                if (!option) return reset();
                loadCombination(option.combination);
              }}
            />
          ) : (
            <>
              <FormControl
                key={`${nameKey}`}
                className="ms-4 w-25 text-darkblue text-indent-5 uni-height fs-6-sm"
                defaultValue={combination.name}
                onInput={(e) => (combName.current = e.target.value)}
              />
              <NavItem
                data={navData["operation"]}
                isShow={itemsOpen.get("operation")}
                setShow={() => toggleOpen("operation")}
                className="ms-4"
              />
            </>
          )}
        </>
      )}
      <NavItem
        data={navData["changeEnv"]}
        isShow={itemsOpen.get("changeEnv")}
        setShow={() => toggleOpen("changeEnv")}
        className="ms-auto"
      />
      <Bar />
      {isLogin ? (
        <>
          <NavItem
            data={navData["workMenu"]}
            isShow={itemsOpen.get("workMenu")}
            setShow={() => toggleOpen("workMenu")}
          />
          <NavItem
            data={navData["workCenter"]}
            thin
            isShow={itemsOpen.get("workCenter")}
            setShow={() => toggleOpen("workCenter")}
            button={
              <div
                className="text-textgrey hover-orange flex-center fs-6-sm mt-2 cursor-pointer"
                onClick={logout}
              >
                <Leave className="hover-orange me-2" />
                登出
              </div>
            }
          />
        </>
      ) : (
        <Link
          href="#"
          className="pe-5 flex-center text-darkblue"
          onClick={login}
        >
          <User className="me-2" />
          <span className="fw-bold">登入</span>
        </Link>
      )}

      {/*新增 和 編輯完成*/}
      <ModalWrapper
        key="popup"
        show={isModalOpen("popup")}
        size="lg"
        onHide={() => handleCloseModal("popup")}
      >
        <PopUp
          imageSrc={popupSet.icon}
          title={popupSet.message}
          confirmOnClick={() => handleCloseModal("popup")}
        />
      </ModalWrapper>

      {/*是否刪除*/}
      <ModalWrapper
        key="wantReset"
        show={isModalOpen("wantReset")}
        size="lg"
        onHide={() => handleCloseModal("wantReset")}
      >
        <PopUp
          imageSrc={"/icon/warning.svg"}
          title={"目前尚未儲存，是否要重置?"}
          denyOnClick={() => handleCloseModal("wantReset")}
          confirmOnClick={() => {
            reset();
            handleCloseModal("wantReset");
          }}
        />
      </ModalWrapper>
    </div>
  );
};

export default Navbar;
