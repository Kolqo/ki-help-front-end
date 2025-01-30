import React, { forwardRef } from "react";
import usePasteClick from "../../../model/usePasteClick.js";
import "./styles.css";

const Input = forwardRef(({ onKeyDown, placeholder, className }, ref) => {
  const { inputValue, handlePasteClick, setInputValue } = usePasteClick();

  return (
    <div className="classic-input-wrapper">
      <input
        ref={ref}
        value={inputValue}
        className={`class-input ${className ? className : ""}`}
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button className="paste-button no-focus-and-active" onClick={handlePasteClick}>
        ВСТАВИТИ
      </button>
    </div>
  );
});

export default Input;
