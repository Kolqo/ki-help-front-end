import React  from "react";
import "./styles.css"; 

export default function Loading (props) {

  return (
    <div className={`spinner ${props.className || ""}`} />
  );
};