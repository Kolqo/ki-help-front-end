import React, { useState } from "react";
import "./styles.css";

import { CheckBoxList } from "../../../../../entities";
import getCourses from "../../../../../entities/checkbox-list/const/getCourses.js";

export default function Course(props) {
  return (
    <>
      <div className="style-course">
        {getCourses.map((course) => (
          <CheckBoxList
            key={course.id}
            className="course"
            isChecked={props.isChecked[course.id]}
            setIsChecked={() => props.setIsChecked(course.id)}
          >
            {course.id}
          </CheckBoxList>
        ))}
      </div>
    </>
  );
}
