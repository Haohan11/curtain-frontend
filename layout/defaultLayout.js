import React from "react";
import Head from "next/head";

const defaultLayout = ({ children }) => {
  return (
    <>
      <h1>Header</h1>
      {children}
      <div>
        <h1>footer</h1>
      </div>
    </>
  );
};

export default defaultLayout;
