import React from "react";
import "./styles.css";
import { GroupInput } from "../../../../../shared/ui";

export default function InputBox(props) {
  return (
    <>
      <div className="style-input-box">
        <GroupInput
          fields={props.task.arguments.map((arg) => ({
            label: arg.name,
            placeholder: arg.description,
          }))}
        />
      </div>
    </>
  );
}
