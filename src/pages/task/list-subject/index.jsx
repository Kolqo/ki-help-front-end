import React, { useState } from "react";
import "./styles.css";

import { Courses, Slider, Subjects } from "./ui";
import { ErrorMessage } from "../../../shared/ui";

export default function ListSubject() {
  const [ isCourse, setIsCourse ] = useState(1);

  return (
    <>
      <div className="container-list-subject">
        <Slider/>
        <Courses toggle={isCourse} setToggle={setIsCourse} />
        <Subjects toggle={isCourse}/>
      </div>
    </>
  );
}
