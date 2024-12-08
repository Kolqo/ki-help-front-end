import React, { forwardRef } from "react";
import Input from "../input";
import "./styles.css";

const LabelInput = forwardRef(({ children, ...props }, ref) => {
  return (
    <div className="class-label-input">
      <label>{children}</label>
      <Input ref={ref} {...props} />
    </div>
  );
});

export default LabelInput;
