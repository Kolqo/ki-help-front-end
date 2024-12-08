import React from "react";
import "./styles.css";

export default function UserHeader(props) {
  return (
    <>
      <div className="user-header-area">
        <div className="user-header">
          <div>{props.icon}</div>
          <p>{props.name}</p>
        </div>
        <p>{props.children}</p>
      </div>
    </>
  );
}
