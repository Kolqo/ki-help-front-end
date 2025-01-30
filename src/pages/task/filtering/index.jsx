import React from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

import filterUI from "./const/filterUI.jsx";

export default function Filtering() {
  const { subjectID, filterID } = useParams();

  const selectedFilter = filterUI.find(item => item.id === Number(filterID));
  
  if (!selectedFilter) {
    return <div>Filter not found</div>;
  }

  const SelectedFilter = selectedFilter.ui;

  return (
    <>
      <div className="container-filtering">
        <SelectedFilter subjectID={subjectID}/>
      </div>
    </>
  );
}
