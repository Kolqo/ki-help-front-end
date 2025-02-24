import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { TaskSetting } from "../../../../../shared/ui";
import filterItems from "../../const/filterItems";

export default function Filters(props) {
  const navigate = useNavigate();

  const filterParam = (items) => {
    const selectedValue = props.selectedFilters[items.key];

    if (!selectedValue) {
      return "Вибрати";
    }

    if (items.key === "teacher") {
      return selectedValue.name;
    } else if (items.key === "creator") {
      return selectedValue.username;
    } else if (items.key === "price") {
      return selectedValue;
    } else {
      return selectedValue;
    }
  };

  return (
    <div className="style-filters">
      {filterItems(props.subjectID).map((items) => (
        <TaskSetting
          key={items.id}
          settingName={items.name}
          settingSelected={filterParam(items)}
          subjectID={props.subjectID}
          filterID={items.id}
          onClick={() => navigate(items.to)}
        />
      ))}
    </div>
  );
}