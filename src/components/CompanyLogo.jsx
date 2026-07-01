import React from "react";
import { getLogoUrl } from "../utils/getLogo";

const CompanyLogo = ({ companyId, name }) => {
  return (
    <img
      src={getLogoUrl(`${companyId}.com`)}
      alt={name}
      className="w-30 h-30 rounded-2xl"
    />
  );
};

export default CompanyLogo;
