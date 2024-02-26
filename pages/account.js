import { useRef } from "react";
import Image from "next/image";

import { Col, Form, FormControl, FormGroup } from "react-bootstrap";

import TwoPageLayout from "@/components/twoPageLayout";
import pageJson from "@/data/pageData";
import FormInput from "@/components/input/formInput";
import FormLabel from "@/components/input/formLabel";
import FormPassword from "@/components/input/formPassword";
import SubmitButton from "@/components/input/submitButton";

import Upload from "@/icon/upload";

const AccountPage = () => {
  const pageData = pageJson["account"];

  const fileInputRef = useRef()

  const handleUploadAvatar = (e) => {
    const file = e.target.files[0]
    console.log(file === undefined ? "no file" : file)
  }

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
        <FormGroup className="text-textblue flex-center mb-5 cursor-pointer" onClick={() => {
          fileInputRef.current.click()
        }}>
          <FormControl onChange={handleUploadAvatar} ref={fileInputRef} type="file" hidden/>
          <Upload />
          <span className="ms-2 fw-bold">上傳大頭貼</span>
        </FormGroup>
        <div className="vstack align-items-center text-textgrey">
          <span>Max：200kb</span>
          <span>Size：120*120</span>
        </div>
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
            className="mb-3 text-textdarkblue"
            disabled
            defaultValue={"1004987@gmail.com"}
          />
          <FormGroup className="mb-2" controlId="userName">
            <FormLabel className="fw-bold text-textblue">姓名</FormLabel>
            <FormInput name="userName"></FormInput>
          </FormGroup>
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
