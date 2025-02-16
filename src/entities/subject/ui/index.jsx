import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import SubjectArrow from "../assets/subject-arrow";

export default function Subject(props) {
  const navigate = useNavigate()
  return (
    <>
      <div
        className="class-subject no-select no-focus-and-active"
        onClick={() => navigate(`/list-task/${props.subject.id}`)}
        onContextMenu={props.menuState.handleContextMenu}
        onTouchStart={props.menuState.handleTouchStart}
        onTouchEnd={props.menuState.handleTouchEnd}
        onTouchMove={props.menuState.handleTouchMove}
      >
        {props.subject.name}
        <SubjectArrow />
      </div>
    </>
  );
}
