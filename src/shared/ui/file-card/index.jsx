import React from "react";
import "./styles.css";

export default function FileCard(props) {
  return (
    <>
      <button className="style-file-card">
        {props.icon}
        <p>{props.children}</p>
        <div className="file-card-delate">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      </button>
    </>
  );
}
