import React, { forwardRef } from "react";
import { ClassicInput } from "../index";
import "./styles.css";
import useEnterNavigation from "../../model/useEnterNavigation.js";

const LabelInput = forwardRef(({ children, nextInputRef, ...props }, ref) => {
  const { handleEnterKeyPress } = useEnterNavigation();

  return (
    <div className="class-label-input">
      <label>{children}</label>
      <ClassicInput
        ref={ref}
        onKeyDown={(e) => handleEnterKeyPress(e, nextInputRef)}
        {...props}
      />
    </div>
  );
});

export default LabelInput;