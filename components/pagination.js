import { FormControl } from "react-bootstrap";

import ArrowLeft from "@/icon/arrow-left";
import ArrowRight from "@/icon/arrow-right";

const pagination = () => {
  return (
    <div className="w-100 px-4 py-4 position-absolute bottom-0 left-0 fs-6-sm flex-center" >
      <ArrowLeft width={36} className="me-2" />
      <span className="mx-3">1</span>
      <span className="mx-3">2</span>
      <span className="mx-3">3</span>
      <span className="mx-3">...</span>
      <ArrowRight width={36} className="ms-2" />
      <div className="position-absolute end-0 pe-6 text-textblue">
        <span>選擇頁數</span>
        <FormControl
          className="d-inline-block mx-2 text-center text-textgrey rounded-3"
          style={{ height: "45px", width: "48px" }}
        />
        <span>/ 200</span>
      </div>
    </div>
  );
};

export default pagination;
