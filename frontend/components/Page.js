import React, { Fragment } from "react";
import Header from "./Header";
import Meta from "./Meta";

const Page = ({ children }) => {
  return (
    <Fragment>
      <Meta />
      <Header />
      {children}
    </Fragment>
  );
};

export default Page;
