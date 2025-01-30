import React from "react";
import "./styles.css";

import SubjectArrow from "../assets/subject-arrow";
import { Link } from "react-router-dom";

export default function Subject(props) {
  return (
    <>
      <Link to={`/list-task/${props.subject.id}`} className="class-subject no-underline no-focus-and-active">
        {props.subject.name}
        <SubjectArrow/>
      </Link>
    </>
  );
}