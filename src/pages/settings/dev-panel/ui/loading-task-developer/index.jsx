import React from "react";
import "./styles.css";

export default function LoadingTaskDeveloper(props) {
  const tasksCount = 3;

  const tasks = Array.from({ length: tasksCount }, (_, index) => (
    <div key={index} className="loading-tasks-developer">
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} className="single-row">
          <div className="single-row-box1" style={{flex: (Math.random() * (5 - 2) + 2).toFixed(1)}}></div>
          <div className="single-row-box2"></div>
        </div>
      ))}

      <div className="one-column">
        <div className="color-box"></div>
      </div>
    </div>
  ));

  return (
    <div className={`style-loading-task-developer ${props.className || ""}`}>
      {tasks}
    </div>
  );
}