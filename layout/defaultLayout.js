import React from "react";
import Head from "next/head";

const defaultLayout = ({ children }) => {
  return (
    <>
      <h1>Header</h1>
      {children}
      <div>
        <p>footer</p>
      </div>
    </>
  );
};

export default defaultLayout;
