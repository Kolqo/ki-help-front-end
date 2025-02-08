import React, { useState } from "react";
import "./styles.css";

import { SpecialInput, GroupFiles, ListFaq } from "./ui";
import { Button, ErrorMessage } from "../../../shared/ui";
import { useErrorMessage } from "../../../shared/model/useErrorMessage";

export default function Support() {
  const [fileValue, setFileValue] = useState([]);
  const { error, setError } = useErrorMessage();

  const handleFileChange = (e) => {
    if (fileValue.length + 1 > 3) {
      setError(true);
    } else {
      setError(false);
      const files = Array.from(e.target.files);
      setFileValue((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const handleFileRemove = (indexToRemove) => {
    setFileValue((prevFiles) =>
      prevFiles.filter((file, index) => index !== indexToRemove)
    );
  };

  return (
    <>
      <div className="container-support">
        <ErrorMessage isError={error}>
          Ви не можете завантажити більше трьох файлів
        </ErrorMessage>
        <div className="support-content">
          <SpecialInput onFileChange={handleFileChange} />
          <GroupFiles files={fileValue} onDelete={handleFileRemove} />
          <ListFaq />
        </div>

        <div className="support-button-box">
          <Button className="blue-button support-button">Відправити</Button>
        </div>
      </div>
    </>
  );
}
