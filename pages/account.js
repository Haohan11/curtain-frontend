import Image from "next/image";

import {
  Col,
  Form,
  FormGroup,
} from "react-bootstrap";

import TwoPageLayout from "@/components/twoPageLayout";
import pageJson from "@/data/pageData";
import FormInput from "@/components/input/formInput";
import FormLabel from "@/components/input/formLabel";
import FormPassword from "@/components/input/formPassword";
import SubmitButton from "@/components/input/submitButton";

import Upload from "@/icon/upload";

const AccountPage = () => {
  const pageData = pageJson["account"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    Object.fromEntries(formData)
    console.log(Object.fromEntries(formData))
  };

  const content = (
    <Form className="row h-100 py-5 ps-4 pe-18" onSubmit={handleSubmit}>
      <Col sm={4} className="vstack align-items-center">
        <Image
          className="mx-auto mb-5"
          alt="user image"
          src={"/image/user.jpg"}
          width={125}
          height={125}
        />
        <div className="text-textblue flex-center mb-5">
          <Upload />
          <span className="ms-2 fw-bold">上傳大頭貼</span>
        </div>
        <div className="vstack align-items-center text-textgrey">
          <span>Max：200kb</span>
          <span>Size：120*120</span>
        </div>
      </Col>
      <Col sm={8} className="vstack text-textblue">
        <div className="mb-10">
          <h4 className="fw-bold mb-3">基本資料</h4>
          <FormInput
            className="mb-2 text-textdarkblue"
            disabled
            value={"1004987"}
          />
          <FormInput
            className="mb-3 text-textdarkblue"
            disabled
            value={"1004987@gmail.com"}
          />
          <FormGroup className="mb-2" controlId="name">
            <FormLabel className="fw-bold text-textblue">姓名</FormLabel>
            <FormInput name="userName"></FormInput>
          </FormGroup>
          <FormGroup>
            <FormLabel className="fw-bold text-textblue">手機號碼</FormLabel>
            <FormInput name="phoneNumber"></FormInput>
          </FormGroup>
        </div>
        <div className="mb-10">
          <h4 className="fw-bold mb-3">修改密碼</h4>
          <FormGroup className="mb-2">
            <FormLabel className="fw-bold text-textblue">新密碼</FormLabel>
            <FormPassword name="newPassword"></FormPassword>
          </FormGroup>
          <FormGroup>
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
