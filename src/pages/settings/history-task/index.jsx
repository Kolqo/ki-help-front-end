import React from "react";
import "./styles.css";

import ListTask from "./ui/list-task";

export default function HistoryTask() {
  return (
    <>
      <div className="container-history-task"> 
        <ListTask/>
      </div>
    </>
  );
}