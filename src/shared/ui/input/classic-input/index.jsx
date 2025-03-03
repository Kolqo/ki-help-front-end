import React, { forwardRef } from "react";
import usePasteClick from "../../../model/usePasteClick.js";
import "./styles.css";

const Input = forwardRef(
  ({ onKeyDown, placeholder, className, onChange }, ref) => {
    const { inputValue, handlePasteClick, setInputValue } = usePasteClick();

    const handleChange = (e) => {
      setInputValue(e.target.value);
      if (onChange) onChange(e);
    };

    return (
      <div className="classic-input-wrapper">
        <input
          id="1"
          ref={ref}
          value={inputValue}
          className={`class-input ${className ? className : ""}`}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={onKeyDown}
        />
        {/* <button className="paste-button no-focus-and-active" onClick={handlePasteClick}>
        ВСТАВИТИ
      </button> */}
      </div>
    );
  }
);

export default Input;
