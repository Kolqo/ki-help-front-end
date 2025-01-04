import React from "react";
import SubjectArrow from "../assets/subject-arrow";
import "./styles.css";

export default function Subject(props) {
  return (
    <>
      <div className="class-subject">
        {props.name}
        <SubjectArrow/>
      </div>
    </>
  );
}