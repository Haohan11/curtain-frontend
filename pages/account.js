import Image from "next/image";

import { Col, Form, FormGroup } from "react-bootstrap";

import TwoPageLayout from "@/components/twoPageLayout";
import pageJson from "@/data/pageData";
import FormInput from "@/components/input/formInput";
import FormLabel from "@/components/input/formLabel";
import FormPassword from "@/components/input/formPassword";
import SubmitButton from "@/components/input/submitButton";

const AccountPage = () => {
  const pageData = pageJson["account"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    Object.fromEntries(formData);
    console.log(Object.fromEntries(formData));
  };

  const content = (
    <Form className="row h-100 py-5 p-0 pe-4 pe-lg-6 pe-xxl-16 g-0" onSubmit={handleSubmit}>
      <Col sm={1} lg={3} className="vstack align-items-center position-sticky" style={{height: 'fit-content', top: "1.5625rem"}}>
        <Image
          className="mx-auto mb-5 rounded-circle"
          alt="user image"
          src={"/image/user.jpg"}
          width={125}
          height={125}
        />
      </Col>
      <Col sm={"auto"} className="vstack text-textblue">
        <div className="mb-10">
          <h4 className="fw-bold mb-3">基本資料</h4>
          <FormInput
            className="mb-2 text-textdarkblue"
            disabled
            defaultValue={"1004987"}
          />
          <FormInput
            className="mb-2 text-textdarkblue"
            disabled
            defaultValue={"1004987@gmail.com"}
          />
          <FormInput
            className="mb-3 text-textdarkblue"
            disabled
            defaultValue={"小火龍"}
          />
          <FormGroup controlId="phoneNumber">
            <FormLabel className="fw-bold text-textblue">手機號碼</FormLabel>
            <FormInput name="phoneNumber"></FormInput>
          </FormGroup>
        </div>
        <div className="mb-10">
          <h4 className="fw-bold mb-3">修改密碼</h4>
          <FormGroup controlId="newPassword" className="mb-2">
            <FormLabel className="fw-bold text-textblue">新密碼</FormLabel>
            <FormPassword name="newPassword"></FormPassword>
          </FormGroup>
          <FormGroup controlId="rePassword">
            <FormLabel className="fw-bold text-textblue">
              再次輸入新密碼
            </FormLabel>
            <FormPassword name="rePassword"></FormPassword>
          </FormGroup>
        </div>
        <SubmitButton>{pageData.submitText}</SubmitButton>
      </Col>
    </Form>
  );

  return <TwoPageLayout data={pageData} content={content} />;
};

AccountPage.getLayout = (page) => page;

export default AccountPage;
