import { useState } from "react";

import TwoPageLayout from "@/components/twoPageLayout";
import pageJson from "@/data/pageData";

import LoginForm from "@/components/loginForm";

const pageData = pageJson;

const Content = LoginForm;

const Login = () => {
  const [pageName, setPageName] = useState("login");
  const data = pageData[pageName];
  const toForgetPassword = () => setPageName("forgetPassword");

  const returnTo = () => {
    const destination = pageData[pageName]["returnTo"];
    return destination === "login"
      ? () => setPageName(destination)
      : destination;
  };

  const content = () => {
    if (pageName === "login")
      return <LoginForm data={data} toForgetPassword={toForgetPassword} />;
    if (pageName === "forgetPassword") return <LoginForm data={data} toForgetPassword={toForgetPassword} />;
    if (pageName === "account") return <h1>Account</h1>;
    if (pageName === "resetPassword") return <LoginForm data={data} toForgetPassword={toForgetPassword} />;
  };

  return (
    <TwoPageLayout
      data={pageData[pageName]}
      returnTo={returnTo()}
      content={content()}
    />
  );
};

Login.getLayout = (page) => page;

export default Login;
