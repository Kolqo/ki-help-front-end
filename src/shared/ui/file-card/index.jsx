import React from "react";
import "./styles.css";

export default function FileCard(props) {
  return (
    <>
      <button className="style-file-card">
        <div className="content">
          {props.icon}
          <p>{props.children}</p>
        </div>
        <div
          className="file-card-delete"
          onClick={() => props.onDelete(props.index)}
        >
          {props.crossIcon}
        </div>
      </button>
    </>
  );
}