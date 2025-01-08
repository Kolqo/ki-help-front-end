import React, { forwardRef } from "react";
import { ClassicInput } from "../index"
import "./styles.css";

const LabelInput = forwardRef(({ children, ...props }, ref) => {
  return (
    <div className="class-label-input">
      <label>{children}</label>
      <ClassicInput ref={ref} {...props} />
    </div>
  );
});

export default LabelInput;
