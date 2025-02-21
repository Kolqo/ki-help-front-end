import React from "react";
import { useParams } from 'react-router-dom';
import "./styles.css";

import { Filters, Tasks } from "./ui";
import { useShowPopup, useGoBack } from "../../../shared/model";

export default function ListTask() {
  useGoBack(`/`);
  
  const { subjectID } = useParams();
  const menuState = useShowPopup();

  return (
    <>
      <div className="container-list-task">
        <Filters subjectID={subjectID}/>
        <Tasks subjectID={subjectID} menuState={menuState}/>
      </div>
    </>
  );
}
