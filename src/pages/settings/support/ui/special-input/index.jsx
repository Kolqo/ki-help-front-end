import React, { useRef } from "react";
import "./styles.css";
import usePasteClick from "../../../../../shared/model/usePasteClick";
import { PaperclipIcon } from "../../assets";

export default function SpecialInput(props) {
  const { inputValue, handlePasteClick, setInputValue } = usePasteClick();
  const fileInputRef = useRef(null); // Створюємо референс для введення файлу

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleFileChange = (event) => {
    props.onFileChange(event);
    fileInputRef.current.value = null; 
  };

  return (
    <>
      <div className="style-special-input">
        <label>Повідомлення</label>
        <div className="special-input-input-wrapper">
          <label className="load-file no-focus-and-active">
            <PaperclipIcon />
            <input
              type="file"
              ref={fileInputRef} 
              style={{ display: "none" }}
              onChange={handleFileChange}
              multiple
            />
          </label>
          <input
            className="class-input"
            value={inputValue}
            placeholder="Напишіть повідомлення"
            onChange={handleChange}
          />
          <button
            className="paste-button no-focus-and-active"
            onClick={handlePasteClick}
          >
            ВСТАВИТИ
          </button>
        </div>
      </div>
    </>
  );
}