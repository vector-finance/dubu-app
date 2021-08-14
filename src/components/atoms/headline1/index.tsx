import React from "react";
import { TextStylesProps } from "../../types/textStylesProps";

import "./index.css";

const Headline1: React.FC<TextStylesProps> = ({ children }) => (
  <h1 className="headline1">{children}</h1>
);

export default Headline1;
