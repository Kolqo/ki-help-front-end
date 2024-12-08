import React from "react";
import "./styles.css";

export default function UserHeader(props) {
  return (
    <>
      <div className="admin-header-area">
        <div className="admin-header">{props.name}</div>
        <div className="admin-text">{props.children}</div>
      </div>
    </>
  );
}
