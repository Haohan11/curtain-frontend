import { useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";

import { Col, Form, FormGroup } from "react-bootstrap";

import TwoPageLayout from "@/components/twoPageLayout";
import pageJson from "@/data/pageData";
import FormInput from "@/components/input/formInput";
import FormLabel from "@/components/input/formLabel";
import FormPassword from "@/components/input/formPassword";
import SubmitButton from "@/components/input/submitButton";
import PopUp from "@/components/PopUp";
import ModalWrapper from "@/components/ModalWrapper";

import { checkExpires, validateEmail } from "@/tool/lib";
import { getAccountData, updateAccountData } from "@/tool/request";
import useModals from "@/hook/useModals";

const AccountPage = ({ accountData: { code, email, phone_number, name } }) => {
  const router = useRouter();
  const pageData = pageJson["account"];
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const { handleShowModal, handleCloseModal, isModalOpen } = useModals();

  const [errorEmail, setErrorEmail] = useState({ status: false, message: "" });
  const [errorName, setErrorName] = useState({ status: false, message: "" });
  const [errorPhone, setErrorPhone] = useState({ status: false, message: "" });
  const [errorPassword, setErrorPassword] = useState({
    status: false,
    message: "",
  });
  const [isSamePassword, setIsSamePassword] = useState({
    status: false,
    message: "",
  });

  const newPass = useRef("");

  //驗證
  const validate = (type, value) => {
    switch (type) {
      case "name":
        if (value.length < 2) {
          setErrorName({ status: true, message: "姓名請至少輸入2個字" });
        } else {
          setErrorName({ status: false, message: "" });
        }
        break;
      case "email":
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailPattern.test(value)) {
          setErrorEmail({ status: true, message: "電子郵件輸入有誤" });
        } else {
          setErrorEmail({ status: false, message: "" });
        }
        break;
      case "phone":
        const phonePattern = /^[0-9]{10}$/; // 這裡的正則表示電話號碼應該是10位數字
        if (!phonePattern.test(value)) {
          setErrorPhone({ status: true, message: "手機號碼輸入有誤" });
        } else {
          setErrorPhone({ status: false, message: "" });
        }
        break;
      case "password":
        if (value.length < 4 && value !== "") {
          setErrorPassword({
            status: true,
            message: "密碼請至少輸入4個數字或英文",
          });
        } else {
          setErrorPassword({ status: false, message: "" });
        }
        break;
      case "samePassword":
        if (value !== newPass.current.value) {
          setIsSamePassword({ status: true, message: "再次輸入密碼有誤" });
        } else {
          setIsSamePassword({ status: false, message: "" });
        }
        break;
    }

    // 驗證用戶名

    // 驗證郵箱

    // 驗證密碼
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    Object.fromEntries(formData);
    const data = Object.fromEntries(formData);
    console.log("data", data);
    if (
      !errorEmail.status &&
      !errorName.status &&
      !errorPhone.status &&
      !errorPassword.status &&
      !isSamePassword.status
    ) {
      const res = await updateAccountData(token, formData);
      if (res) {
        handleShowModal("success");
      }
    } else {
      console.log("失敗");
    }
  };

  const content = (
    <Form
      method="post"
      className="row h-100 px-sm-4 px-lg-6 px-xxl-16 g-0"
      onSubmit={handleSubmit}
    >
      <Col className="vstack text-textblue pt-2 px-4">
        <div className="mb-9">
          <h4 className="fw-bold mb-3">基本資料</h4>
          <FormLabel className="fw-bold text-textblue">員工編號</FormLabel>
          <FormInput
            className="mb-2 text-textdarkblue"
            disabled
            defaultValue={code}
          />
          <FormLabel className="fw-bold text-textblue">員工電子郵箱</FormLabel>
          <FormInput
            className="mb-2 text-textdarkblue"
            name="email"
            // disabled
            defaultValue={email}
            onChange={(event) => {
              validate("email", event.target.value);
            }}
          />
          {errorEmail?.status && (
            <p className="text-red my-3">{errorEmail.message}</p>
          )}
          <FormLabel className="fw-bold text-textblue">員工姓名</FormLabel>
          <FormInput
            className="mb-3 text-textdarkblue"
            name="name"
            // disabled
            defaultValue={name}
            onChange={(event) => {
              validate("name", event.target.value);
            }}
          />
          {errorName?.status && (
            <p className="text-red my-3">{errorName.message}</p>
          )}
          <FormGroup controlId="phone_number">
            <FormLabel className="fw-bold text-textblue">手機號碼</FormLabel>
            <FormInput
              className="text-textblue"
              name="phone_number"
              // disabled
              defaultValue={phone_number}
              onChange={(event) => {
                validate("phone", event.target.value);
              }}
            ></FormInput>
            {errorPhone?.status && (
              <p className="text-red my-3">{errorPhone.message}</p>
            )}
          </FormGroup>
        </div>
        <div className="flex-grow-1">
          <h4 className="fw-bold mb-3">
            修改密碼
            <span className="ms-2 fs-6-sm fw-normal">( 不修改請留空 )</span>
          </h4>
          <FormGroup controlId="password" className="mb-2">
            <FormLabel className="fw-bold text-textblue">新密碼</FormLabel>
            <FormPassword
              name="password"
              ref={newPass}
              onChange={(event) => {
                validate("password", event.target.value);
              }}
            ></FormPassword>
          </FormGroup>
          {errorPassword?.status && (
            <p className="text-red my-2">{errorPassword.message}</p>
          )}
          <FormGroup controlId="rePassword">
            <FormLabel className="fw-bold text-textblue">
              再次輸入新密碼
            </FormLabel>
            <FormPassword
              name="rePassword"
              onChange={(event) => {
                validate("samePassword", event.target.value);
              }}
            ></FormPassword>
          </FormGroup>
          {isSamePassword?.status && (
            <p className="text-red my-2">{isSamePassword.message}</p>
          )}
        </div>
        <SubmitButton className="mt-3">{pageData.submitText}</SubmitButton>
      </Col>

      <ModalWrapper
        key="success"
        show={isModalOpen("success")}
        size="lg"
        onHide={() => router.push("/")}
      >
        <PopUp
          imageSrc={"/icon/check-circle.svg"}
          title={"修改成功"}
          confirmOnClick={() => router.push("/")}
        />
      </ModalWrapper>

      {/* <ModalWrapper
        key="popup"
        show={isModalOpen("popup")}
        size="lg"
        onHide={() => handleCloseModal("popup")}
      >
        <PopUp
          imageSrc={"/icon/circle-error.svg"}
          title={"帳號或密碼錯誤"}
          confirmOnClick={() => handleCloseModal("popup")}
        />
      </ModalWrapper> */}
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
