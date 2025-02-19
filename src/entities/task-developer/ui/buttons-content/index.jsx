import React from "react";
import "./styles.css";

import { TopIconButton } from "../../../../shared/ui";

import { CheckIcon } from "../../assets";

export default function ButtonsContent(props) {
  return (
    <>
      <div className="style-buttons-content">
        <TopIconButton leftIcon={<CheckIcon/>} className="gray-button button">Відправити</TopIconButton>
      </div>
    </>
  );
}
