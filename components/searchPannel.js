import { useRouter } from "next/router";

import { useRef } from "react";

import { Row as BSRow, Col, Form, FormControl } from "react-bootstrap";

import Stars from "@/components/input/starsRating";
import Search from "@/icon/search";
import Select from "@/components/input/select";

import addClassName from "@/tool/addClassName";

const Row = addClassName(BSRow, "mb-3 g-0");
const TitleCol = addClassName(Col, "col-sm-4 fw-bold py-2");

const SearchPannel = ({ designData, materialData, colorSchemeData }) => {
  const router = useRouter();
  const querysRef = useRef({
    stockName: null,
    colorScheme: [],
    design: [],
    material: [],
    block: null,
    absorption: null,
  });

  const getSingleValueHandler = (name) => (e) =>
    (querysRef.current = {
      ...querysRef.current,
      [name]: e.target.value.length >= 15 ? null : e.target.value,
    });

  const getMultiOptionHandler = (name) => (option) =>
    (querysRef.current = {
      ...querysRef.current,
      [name]: option.map((v) => v.value),
    });

  const pushQuerys = () => {
    // separate field names out
    const {
      stockName,
      colorScheme,
      design,
      material,
      block,
      absorption,
      ...querys
    } = router.query;

    router.push({
      query: {
        ...querys,
        page: 1,
        ...Object.entries(querysRef.current).reduce(
          (queryObj, [key, value]) => ({
            ...queryObj,
            ...(Array.isArray(value) &&
              value.length > 0 && { [key]: JSON.stringify(value) }),
            ...(!Array.isArray(value) && value && { [key]: value }),
          }),
          {}
        ),
      },
    });
  };

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
              onChange={getSingleValueHandler("stockName")}
            />
          </Col>
        </Row>
        <Row>
          <TitleCol>
            <span>色系</span>
          </TitleCol>
          <Col>
            <Select
              isMulti
              options={colorSchemeData.map((cs) => ({
                label: cs.name,
                value: cs.id,
              }))}
              onChange={getMultiOptionHandler("colorScheme")}
            ></Select>
          </Col>
        </Row>
        <Row>
          <TitleCol>
            <span>風格</span>
          </TitleCol>
          <Col>
            <Select
              isMulti
              options={designData.map((cs) => ({
                label: cs.name,
                value: cs.id,
              }))}
              onChange={getMultiOptionHandler("design")}
            ></Select>
          </Col>
        </Row>
        <Row>
          <TitleCol>
            <span>面料材質</span>
          </TitleCol>
          <Col>
            <Select
              isMulti
              options={materialData.map((cs) => ({
                label: cs.name,
                value: cs.id,
              }))}
              onChange={getMultiOptionHandler("material")}
            ></Select>
          </Col>
        </Row>
        <Row>
          <TitleCol>
            <span>遮光度</span>
          </TitleCol>
          <Col className="d-flex">
            <Stars
              width={20}
              name="block"
              onInput={getSingleValueHandler("block")}
            />
          </Col>
        </Row>
        <Row>
          <TitleCol>
            <span>吸音效果</span>
          </TitleCol>
          <Col className="d-flex">
            <Stars
              width={20}
              name="absorption"
              onInput={getSingleValueHandler("absorption")}
            />
          </Col>
        </Row>
      </Form>
      <div
        className="position-absolute flex-center bottom-0 left-0 w-100 bg-darkblue text-white cursor-pointer"
        style={{ height: "54px" }}
        onClick={pushQuerys}
      >
        立即搜尋
      </div>
    </div>
  );
};

export default SearchPannel;
