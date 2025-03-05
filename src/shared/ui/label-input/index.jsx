import React, { forwardRef } from "react";
import { ClassicInput } from "../index";
import "./styles.css";
import useEnterNavigation from "../../model/useEnterNavigation.js";

const LabelInput = forwardRef(({ children, nextInputRef, value, ...props }, ref) => {
  const { handleEnterKeyPress } = useEnterNavigation();

  const handleChange = (e) => {
    const value = e.target.value;
    
    if (value && nextInputRef && nextInputRef.current) {
      nextInputRef.current.focus();
    }
    
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="class-label-input">
      <label>{children}</label>
      <ClassicInput
        ref={ref}
        value={value}
        onKeyDown={(e) => handleEnterKeyPress(e, nextInputRef)}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
});

export default LabelInput;