import React from "react";
import { useParams } from 'react-router-dom';
import "./styles.css";

import { Filters, Tasks } from "./ui";
import useShowPopup from "../../../shared/model/useShowPopup";

export default function ListTask() {
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
