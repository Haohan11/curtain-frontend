import Image from "next/image";
import loadingDataUrl from "@/data/loadingDataUrlTrans"
import addClassName from "@/tool/addClassName";
import ExposeDiv from "./Div";

const Div = addClassName(ExposeDiv, "position-relative")

export const LoadingCircle = ({
  className,
  style,
  width = "50px",
  height = "50px",
}) => {
  return (
    <Div className={className} style={{ width, height, ...style }}>
      <Image alt="loading-img" fill src={loadingDataUrl} />
    </Div>
  );
};
