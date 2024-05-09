import { useState } from "react";

import { FormControl } from "react-bootstrap";

import ArrowLeft from "@/icon/arrow-left";
import ArrowRight from "@/icon/arrow-right";

import { onlyNumber } from "@/tool/lib";

const triggerDict = ["blur", "enter"];

const Pagination = ({
  totalPage,
  onPageChange,
  defaultPage = 1,
  inputTrigger,
}) => {
  const [page, setPage] = useState(defaultPage);
  const trigger = triggerDict.includes(inputTrigger) ? inputTrigger : "both";
  const enterTrigger = ["enter", "both"].includes(trigger);
  const blurTrigger = ["blur", "both"].includes(trigger);

  return (
    <div className="w-100 p-4 fs-6-sm flex-center">
      <ArrowLeft width={36} className="me-2 cursor-pointer" />
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
          onKeyDown={(e) => {
            onlyNumber(e);
            enterTrigger &&
              e.key === "Enter" &&
              !isNaN(parseInt(e.target.value)) &&
              onPageChange(e.target.value);
          }}
          onBlur={(e) => blurTrigger && onPageChange(e.target.value)}
          // onChange={(e) => onPageChange(e.target.value)}
          defaultValue={defaultPage}
        />
        <span className="me-2">/</span>
        <span>{totalPage}</span>
      </div>
    </div>
  );
};

export default Pagination;
