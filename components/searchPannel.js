import {
  Row as BSRow,
  Col,
  Form,
  FormControl,
  FormSelect,
} from "react-bootstrap";

import Stars from "./input/starsRating";
import Search from "@/icon/search";

import addClassName from "@/tool/addClassName";

const Input = addClassName(FormControl, "text-textgrey text-indent-2");
const Select = addClassName(FormSelect, "text-textgrey");
const Row = addClassName(BSRow, "mb-2");
const TitleCol = addClassName(
  Col,
  "flex-center justify-content-start col-sm-4 fw-bold"
);

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
            <Input placeholder="輸入產品名稱" />
          </Col>
        </Row>
        <Row>
          <TitleCol>
            <span>色系</span>
          </TitleCol>
          <Col>
            <Select>
              <option>紅色</option>
              <option>藍色</option>
              <option>綠色</option>
            </Select>
          </Col>
        </Row>
        <Row>
          <TitleCol>
            <span>風格</span>
          </TitleCol>
          <Col>
            <Select>
              <option>工業</option>
              <option>森林</option>
            </Select>
          </Col>
        </Row>
        <Row>
          <TitleCol>
            <span>面料材質</span>
          </TitleCol>
          <Col>
            <Select>
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
            <div className="ps-2 py-2">
              <Stars name={"block"} />
            </div>
          </Col>
        </Row>
        <Row>
          <TitleCol>
            <span>吸音效果</span>
          </TitleCol>
          <Col>
            <div className="ps-2 py-2">
              <Stars name={"mute"} />
            </div>
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
