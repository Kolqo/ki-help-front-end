import React from "react";
import "./styles.css";

export default function UserHeader(props) {
  return (
    <>
      <div className="buy-header-area">
        <div>{props.name}</div>
        <div>{props.children}</div>
      </div>
    </>
  );
}
