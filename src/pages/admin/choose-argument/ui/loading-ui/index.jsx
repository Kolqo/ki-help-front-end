import React from "react";
import "./styles.css";

export default function LoadingUi(props) {
  return (
    <>
      <div className={`style-loading-arguments ${props.className || ""}`}>
        <div className="loading-ui">
          <div className="loading-ui-box1"/>
          <div className="loading-ui-box2"/>
        </div>
        <div className="loading-ui">
          <div className="loading-ui-box1"/>
          <div className="loading-ui-box2"/>
        </div>
        <div className="loading-ui">
          <div className="loading-ui-box1"/>
          <div className="loading-ui-box2"/>
        </div>
      </div>
    </>
  );
}
