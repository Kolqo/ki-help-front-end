import React from "react";
import "./styles.css";

export default function LoadingTask(props) {
  const tasksCount = 3;
  const tasks = Array.from({ length: tasksCount }, (_, index) => (
    <div key={index} className="loading-users">
      <div className="circle"></div>

      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="single-row">
          <div className="color-box"></div>
        </div>
      ))}

      <div className="three-columns">
        {Array.from({ length: 3 }, (_, j) => (
          <div key={j} className="color-box"></div>
        ))}
      </div>
    </div>
  ));

  return (
    <div className={`style-loading-user ${props.className || ""}`}>
      {tasks}
    </div>
  );
}