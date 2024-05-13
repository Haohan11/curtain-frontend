import { useState, useRef } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import Leave from "@/icon/leave";
import Logo from "@/icon/logoSvg";
import User from "@/icon/user";
import { Form, FormControl } from "react-bootstrap";
import Select from "@/components/input/select";

import NavItem from "@/components/navItem";
import exportImage from "@/tool/exportImage";
import { createCombination, updateCombination } from "@/tool/request";

import { useCombination } from "@/hook/provider/combinationProvider";
import { useSession } from "next-auth/react";

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
  envId,
  setEnvId,
  selectStock,
}) => {
  const router = useRouter();

  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const showMode =
    ["true", "false"].includes(router.query.showMode) &&
    JSON.parse(router.query.showMode);

  const { combination, resetCombination } = useCombination();
  const combName = useRef(combination.name);

  const reset = () => {
    resetCombination();
    setNameKey((prev) => prev + 1);
  };

  // for force name input reRender
  const [nameKey, setNameKey] = useState(0);

  const getHandledCombData = () => {
    try {
      const { id } = combination;
      const name = combName.current;
      if (!envId || !name)
        throw new Error(
          `Combination data invalid: envId: ${envId}, combination name: ${name}`
        );
      return {
        id,
        name,
        environment_id: envId,
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
        { label: "新增組合", action: reset },
        {
          label: "儲存組合",
          action: async () => {
            const data = getHandledCombData();
            (data &&
              token &&
              (data.id === null
                ? await createCombination(token, data)
                : await updateCombination(token, data))) ||
              console.log("Fail to create combination.");
          },
        },
      ],
    },
    changeEnv: {
      navText: (() => {
        const { name } = envData.find((env) => env.id === envId) ?? {};
        return name || "變更環境";
      })(),
      items: envData.map((env) => ({
        ...env,
        label: env.name,
        action: () => setEnvId(env.id),
      })),
    },
    workMenu: {
      navText: "工作選單",
      items: [
        { label: "我的組合", name: "combination", link: "/combination" },
        {
          label: "匯出圖檔",
          name: "exportImage",
          action: () => selectStock.stock !== null && exportImage(),
        },
      ],
    },
    workCenter: {
      navText: "工作中心",
      items: [{ label: "我的帳號", name: "myAccount", link: "/account" }],
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
            onInput={(e) =>
              router.push({
                query: { ...router.query, showMode: e.target.checked },
              })
            }
          ></Form.Switch>
          <Bar />
          <span className="fw-bold">{showMode ? "選擇組合" : "當前組合"}</span>
          {showMode ? (
            <Select className="ms-4 w-25 z-3" isClearable />
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
    </div>
  );
};

export default Navbar;
