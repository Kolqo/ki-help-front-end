import React from "react";
import "./styles.css";

import { GroupInput } from "../../../../../shared/ui";

export default function Fields(props) {
  return (
    <>
      <div className="style-task-fields">
        <GroupInput
          fields={props.fields.map((item, index) => ({
            label: item.label,
            placeholder: item.placeholder,
            value: props.values ? props.values[index] : "",
          }))}
          onChange={props.onChange}
          
        />
      </div>
    </>
  );
}
