import ArrowLeft from "@/icon/arrow-left";

const ReturnButton = ({ text }) => {
  return (
    <>
      <ArrowLeft width="2rem" height="2rem" className="me-2" />
      <span className="fs-5-sm">{text || "返回"}</span>
    </>
  );
};

export default ReturnButton;
