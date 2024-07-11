/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Helmet } from "react-helmet";
const PageTitleSetUp = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default PageTitleSetUp;
