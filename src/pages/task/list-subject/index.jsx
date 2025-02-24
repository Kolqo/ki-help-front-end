import React, { useState } from "react";
import "./styles.css";

import { Courses, Slider, Subjects } from "./ui";
import useShowPopup from "../../../shared/model/useShowPopup";

export default function ListSubject(props) {
  const [isCourse, setIsCourse] = useState(props.userCourse);
  const menuState = useShowPopup();

  return (
    <>
      <div className="container-list-subject">
        <Slider />
        <Courses toggle={isCourse} setToggle={setIsCourse} />
        <Subjects toggle={isCourse} menuState={menuState} />
      </div>
    </>
  );
}
