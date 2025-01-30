import React from "react";
import { useParams } from 'react-router-dom';
import "./styles.css";

import { Filters, Tasks } from "./ui";

export default function ListTask() {
  const { subjectID } = useParams();
  
  return (
    <>
      <div className="container-list-task">
        <Filters subjectID={subjectID}/>
        <Tasks subjectID={subjectID}/>
      </div>
    </>
  );
}
