import React from "react";
import "./styles.css";

import { GroupInput } from "../../../../../shared/ui";

export default function Fields(props) {
  return (
    <>
      <div className="style-fields">
        <GroupInput
          fields={props.fields.map((item) => ({
            label: item.label,
            placeholder: item.placeholder,
          }))}
          onChange={props.onChange}
        />
      </div>
    </>
  );
}
