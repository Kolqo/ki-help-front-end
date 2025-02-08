import React from "react";
import "./styles.css";

import ListTaskDeveloper from "./ui/list-task-developer";

export default function DevPanel() {
  return (
    <>
      <div className="container-dev-panel"> 
        <ListTaskDeveloper/>
      </div>
    </>
  );
}