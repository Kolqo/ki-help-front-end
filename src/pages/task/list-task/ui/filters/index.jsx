import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { TaskSetting } from "../../../../../shared/ui";
import filterItems from "../../const/filterItems";

export default function Filters(props) {
  const navigate = useNavigate();

  return (
    <div className="style-filters">
      {filterItems(props.subjectID).map((items) => (
        <TaskSetting
          key={items.id}
          settingName={items.name}
          settingSelected={items.select}
          subjectID={props.subjectID}
          filterID={items.id}
          onClick={() => navigate(items.to)}
        />
      ))}
    </div>
  );
}
