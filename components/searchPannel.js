import {
  Row as BSRow,
  Col,
  Form,
  FormControl,
  FormSelect,
} from "react-bootstrap";

import ColorRadios from "./input/colorRadios";
import Stars from "@/components/input/starsRating";
import Search from "@/icon/search";

import addClassName from "@/tool/addClassName";

const Select = addClassName(FormSelect, "text-textgrey");
const Row = addClassName(BSRow, "mb-3 g-0");
const TitleCol = addClassName(Col, "col-sm-4 fw-bold py-2");

const SearchPannel = () => {
  return (
    <div className="position-relative shadow h-100">
      <Form
        className="text-textblue px-4 overflow-y-auto"
        style={{ height: "calc(100% - 54px)" }}
      >
        <div className="flex-center justify-content-start pt-4 pb-3 bg-white">
          <Search width={22} className="text-textgrey" />
          <span className="ms-2 fs-6 fw-bold">搜尋產品</span>
        </div>
        <Row>
          <TitleCol>
            <span>關鍵字</span>
          </TitleCol>
          <Col>
            <FormControl
              className="text-textgrey text-indent-2 uni-height"
              placeholder="輸入產品名稱"
            />
          </Col>
        </Row>
        <Row>
          <TitleCol>
            <span>色系</span>
          </TitleCol>
          <Col>
            <ColorRadios />
          </Col>
        </Row>
        <Row>
          <TitleCol>
            <span>風格</span>
          </TitleCol>
          <Col>
            <ColorRadios />
          </Col>
        </Row>
        <Row>
          <TitleCol>
            <span>面料材質</span>
          </TitleCol>
          <Col>
            <Select className="uni-height">
              <option>絲綢</option>
              <option>帆布</option>
            </Select>
          </Col>
        </Row>
        <Row>
          <TitleCol>
            <span>遮光度</span>
          </TitleCol>
          <Col>
            <Stars
              name={"block"}
              className="ps-2 uni-height "
            />
          </Col>
        </Row>
        <Row>
          <TitleCol>
            <span>吸音效果</span>
          </TitleCol>
          <Col>
            <Stars name={"mute"} className="ps-2 uni-height" />
          </Col>
        </Row>
      </Form>
      <div
        className="position-absolute flex-center bottom-0 left-0 w-100 bg-darkblue text-white cursor-pointer"
        style={{ height: "54px" }}
      >
        立即搜尋
      </div>
    </div>
  );
};

export default SearchPannel;
