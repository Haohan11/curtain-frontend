import Image from "next/image";

import { Col, Form, FormGroup } from "react-bootstrap";

import TwoPageLayout from "@/components/twoPageLayout";
import pageJson from "@/data/pageData";
import FormInput from "@/components/input/formInput";
import FormLabel from "@/components/input/formLabel";
import FormPassword from "@/components/input/formPassword";
import SubmitButton from "@/components/input/submitButton";

import { checkExpires } from "@/tool/lib";
import { getSession } from "next-auth/react";
import { getAccountData } from "@/tool/request";

const AccountPage = ({ accountData: { code, email, phone_number, name } }) => {
  const pageData = pageJson["account"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    Object.fromEntries(formData);
    console.log(Object.fromEntries(formData));
  };

  const content = (
    <Form
      className="row h-100 px-sm-4 px-lg-6 px-xxl-16 g-0"
      onSubmit={handleSubmit}
    >
      <Col className="vstack text-textblue p-4">
        <div className="mb-10">
          <h4 className="fw-bold mb-3">基本資料</h4>
          <FormInput
            className="mb-2 text-textdarkblue"
            disabled
            defaultValue={code}
          />
          <FormInput
            className="mb-2 text-textdarkblue"
            disabled
            defaultValue={email}
          />
          <FormInput
            className="mb-3 text-textdarkblue"
            disabled
            defaultValue={name}
          />
          <FormGroup controlId="phoneNumber">
            <FormLabel className="fw-bold text-textblue">手機號碼</FormLabel>
            <FormInput
            className="text-textblue"
              name="phoneNumber"
              disabled
              defaultValue={phone_number}
            ></FormInput>
          </FormGroup>
        </div>
        <div className="flex-grow-1"></div>
        {/* <div className="mb-10">
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
        </div> */}
        {/* <SubmitButton>{pageData.submitText}</SubmitButton> */}
      </Col>
    </Form>
  );

  return <TwoPageLayout data={pageData} content={content} />;
};

AccountPage.getLayout = (page) => page;

export default AccountPage;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session || checkExpires(session._exp)) {
    return {
      redirect: { destination: "/login" },
    };
  }
  const accessToken = session.user.accessToken;
  const accountData = (await getAccountData(accessToken)) || {
      code: "",
      email: "",
      phone_number: "",
      name: "",
  };

  return {
    props: {
      accountData,
    },
  };
};
