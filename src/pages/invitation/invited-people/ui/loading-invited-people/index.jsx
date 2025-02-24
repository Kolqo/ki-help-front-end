import React from "react";
import "./styles.css";

export default function LoadingTask(props) {
  return (
    <>
      <div className={`style-loading-invited-people ${props.className || ""}`}>
        <div className="color-box"/>
        <div className="color-box"/>
        <div className="color-box"/>
        <div className="color-box"/>
        <div className="color-box"/>
      </div>
    </>
  );
}
