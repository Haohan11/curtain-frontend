import { FormControl } from "react-bootstrap";

import ArrowLeft from "@/icon/arrow-left";
import ArrowRight from "@/icon/arrow-right";

import { onlyNumber } from "@/tool/lib";

const pagination = ({ total, totalPage }) => {
  return (
    <div className="w-100 p-4 fs-6-sm flex-center">
      <ArrowLeft width={36} className="me-2" />
      <span className="mx-3">1</span>
      <span className="mx-3">2</span>
      <span className="mx-3">3</span>
      <span className="mx-3">...</span>
      <ArrowRight width={36} className="ms-2" />
      <div className="position-absolute end-0 pe-6 text-textblue">
        <span>選擇頁數</span>
        <FormControl
          className="d-inline-block mx-2 text-center text-textgrey rounded-3 fs-6-sm"
          style={{ height: "38px", width: "42px" }}
          onKeyDown={onlyNumber}
          defaultValue={1}
          disabled
        />
        <span className="me-2">/</span>
        <span>{totalPage}</span>
      </div>
    </div>
  );
};

export default pagination;
