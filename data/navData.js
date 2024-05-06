import exportImage from "@/tool/exportImage";

const data = {
  operation: {
    navText: "操作",
    items: [
      { label: "新增組合" },
      { label: "儲存組合" },
      { label: "另存組合" },
    ],
  },
  changeEnv: {
    navText: "變更環境",
    items: [],
  },
  workMenu: {
    navText: "工作選單",
    items: [
      { label: "我的組合", name: "combination", link: "/combination" },
      { label: "匯出圖檔", name: "exportImage", action: exportImage },
    ],
  },
  workCenter: {
    navText: "工作中心",
    items: [{ label: "我的帳號", name: "myAccount", link: "/account" }],
  },
};

export default data;
