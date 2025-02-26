import React from "react";
import "./styles.css";

import { TopIconButton } from "../../../../shared/ui";

import { CheckIcon } from "../../assets";

export default function ButtonsContent(props) {

  return (
    <>
      <div className="style-buttons-content">
        <TopIconButton
          leftIcon={<CheckIcon />}
          className="gray-button button"
          onClick={() => props.sendTask.handleSendTask(props.taskDeveloper.id, props.fileValue)}
        >
          {props.sendTask.isLoading ? "Відправляється" : "Відправити"}
        </TopIconButton>
      </div>
    </>
  );
}
