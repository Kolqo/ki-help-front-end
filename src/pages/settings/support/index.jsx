import React, { useState } from "react";
import "./styles.css";

import { SpecialInput, GroupFiles, ListFaq } from "./ui";
import { Button, ErrorMessage } from "../../../shared/ui";
import useFileLoad from "./model/useFileLoad.js";

export default function Support() {
  const { error, errorMassage, fileValue, handleFileChange, handleFileRemove } = useFileLoad();

  return (
    <>
      <div className="container-support">
        <ErrorMessage isError={error}>
          {errorMassage}
        </ErrorMessage>
        <div className="support-content">
          <SpecialInput onFileChange={handleFileChange} />
          <GroupFiles files={fileValue} onDelete={handleFileRemove} />
          <ListFaq />
        </div>

        <Button className="blue-button fixed-button">Відправити</Button>
      </div>
    </>
  );
}
