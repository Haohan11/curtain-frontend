import { useState, useRef, Fragment } from "react";

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
  extend: rawExtend,
}) => {
  const intExtend = parseInt(rawExtend);
  const extend =
    isNaN(intExtend) || intExtend < 0 || intExtend > totalPage ? 2 : intExtend;

  const trigger = triggerDict.includes(inputTrigger) ? inputTrigger : "both";
  const enterTrigger = ["enter", "both"].includes(trigger);
  const blurTrigger = ["blur", "both"].includes(trigger);

  const [page, setPage] = useState(defaultPage);
  const inputKeyRef = useRef(0);

  const checkPage = (target) => {
    const targetPage = parseInt(target);
    return (
      !isNaN(targetPage) &&
      targetPage >= 1 &&
      targetPage <= totalPage &&
      targetPage
    );
  };
  const setCurrentPage = (cp) => {
    const targetPage = checkPage(cp);
    if (!targetPage) return;
    setPage(targetPage);
    typeof onPageChange === "function" && onPageChange(targetPage);
    inputKeyRef.current ++
  };
  const forward = () => page + 1 <= totalPage && setCurrentPage(page + 1);
  const backward = () => page - 1 >= 1 && setCurrentPage(page - 1);


  return (
    <div
      className="position-relative px-4 fs-6-sm flex-center"
      style={{ userSelect: "none" }}
    >
      <ArrowLeft
        width={38}
        className={`me-2 ${page !== 1 && "cursor-pointer "}`}
        {...(page === 1 && { color: "lightgray" })}
        onClick={backward}
      />
      {[...Array(extend * 2 + 1)]
        .reduce((store, _, index) => {
          const pp = index - extend + page;
          return pp >= 1 && pp <= totalPage ? [...store, pp] : store;
        }, [])
        .map((pp, index, array) => (
          <Fragment key={pp}>
            {index === 0 && pp > 1 && <span>. . .</span>}
            <div
              className={`px-3 cursor-pointer rounded-2 ${
                pp === page && "bg-textblue text-white"
              }`}
              style={{
                marginInline: "2px",
                height: "40px",
                lineHeight: "40px",
              }}
              onClick={() => setCurrentPage(pp)}
            >
              {pp}
            </div>
            {index === array.length - 1 && pp < totalPage && <span>. . .</span>}
          </Fragment>
        ))}
      <ArrowRight
        width={38}
        className={`ms-2 ${page !== totalPage && "cursor-pointer "}`}
        {...(page === totalPage && { color: "lightgray" })}
        onClick={forward}
      />
      <div className="position-absolute end-0 text-textblue pe-8">
        <span>選擇頁數</span>
        <FormControl
          key={inputKeyRef.current}
          className="d-inline-block mx-2 text-center text-textgrey rounded-3 fs-6-sm"
          style={{ height: "38px", width: "42px" }}
          onKeyDown={(e) => {
            onlyNumber(e);
            enterTrigger && e.key === "Enter" && setCurrentPage(e.target.value);
          }}
          onBlur={(e) => blurTrigger && setCurrentPage(e.target.value)}
          defaultValue={page}
        />
        <span className="me-2">/</span>
        <span>{totalPage}</span>
      </div>
    </div>
  );
};

export default Pagination;
