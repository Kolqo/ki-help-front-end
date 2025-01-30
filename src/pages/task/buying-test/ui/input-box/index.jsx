import React from "react";
import "./styles.css";

import { GroupInput } from "../../../../../shared/ui";

export default function InputBox(props) {
  return (
    <>
      <div className="style-input-box">
        <GroupInput
          fields={props.inputFields.map((item) => ({
            label: item.label,
            placeholder: item.placeholder,
          }))}
        />
      </div>
    </>
  );
}
