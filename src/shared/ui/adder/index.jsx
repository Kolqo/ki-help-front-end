import React from "react";
import { AdderIcon } from "../../assets/svg"
import "./styles.css";

export default function Adder(props) {
  return (
    <>
      <div className={`class-adder ${props.className || ""}`}>
        <AdderIcon/>
        <p>{props.children}</p>
      </div>
    </>
  );
}