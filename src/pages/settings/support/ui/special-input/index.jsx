import React, { useRef } from "react";
import "./styles.css";
import usePasteClick from "../../../../../shared/model/usePasteClick";
import { PaperclipIcon } from "../../assets";

export default function SpecialInput(props) {
  // Pass props.onChange to usePasteClick to handle paste updates
  const { handlePasteClick } = usePasteClick(props.onChange);
  const fileInputRef = useRef(null);

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
            value={props.value} 
            placeholder="Напишіть повідомлення"
            onChange={(e) => props.onChange(e.target.value)} 
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