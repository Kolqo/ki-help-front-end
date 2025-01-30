import React from "react";
import "./styles.css";

import { TaskSetting } from "../../../../../shared/ui";
import filterItems from "../../const/filterItems";

export default function Filters(props) {
  
  return (
    <div className="style-filters">
      {filterItems.map((items) => (
        <TaskSetting
          key={items.id}
          settingName={items.name}
          settingSelected={items.select}
          subjectID={props.subjectID}
          filterID={items.id}
        />
      ))}
    </div>
  );
}
