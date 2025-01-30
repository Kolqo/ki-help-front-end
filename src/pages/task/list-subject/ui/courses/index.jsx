import React from "react";
import "./styles.css";

import CourseItems from "../../const/courseItems.jsx";

export default function Courses(props) {
  return (
    <>
      <div className="style-courses no-select no-focus-and-active">
        {CourseItems.map((items) => (
          <div
            key={items.id}
            className={`course no-underline ${
              props.toggle === items.id ? "active" : ""
            }`}
            onClick={() => props.setToggle(items.id)}
          >
            <p>{items.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}
