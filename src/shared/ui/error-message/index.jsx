import React from "react";
import "./styles.css";

import { ErrorIcon } from "../../assets/svg";

export default function ErrorMessage(props) {
  return (
    <>
      {props.isError && (
        <div className="error-area">
          <ErrorIcon />
          {props.children}
        </div>
      )}
    </>
  );
}
