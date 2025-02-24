import React from "react";
import { useLocation, useParams } from "react-router-dom";
import "./styles.css";

import { Button, BuyHeader, Loading, ErrorMessage } from "../../../shared/ui";
import { InputBox, TaskDescription } from "./ui";
import { AdderIcon } from "../../../shared/assets/svg";

import { useGoBack } from "../../../shared/model"

import { useInputFields, useBuyingTest } from "./model";

export default function BuyingTest() {
  const location = useLocation();
  const { task } = location.state || {};
  const { subjectID, buying } = useParams();

  useGoBack(`/list-task/${subjectID}`);

  const { inputFields, addNewField } = useInputFields(task);
  const { error, errorMessage, loading, handleFieldChange, handleValidation } =
    useBuyingTest(task.arguments);

  return (
    <>
      <div className="container-buying-test">
        <ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
        <div className="buying-test">
          <BuyHeader name={task.title}>{task.teacher.subject.name}</BuyHeader>
          {task.description.length > 0 && (
            <TaskDescription description={task.description} />
          )}
          <InputBox inputFields={inputFields} onChange={handleFieldChange} />
          <Button
            className="gray-button buying-test-button"
            leftIcon={<AdderIcon />}
            onClick={addNewField}
          >
            Добавити одне запитання
          </Button>
        </div>
        <Button
          className="blue-button fixed-button"
          disabled={loading}
          leftIcon={loading && <Loading className="buying-test-spinner" />}
          onClick={() => handleValidation(subjectID, buying, task)}
        >
          {loading ? "Генерація" : "Відправити"}
        </Button>
      </div>
    </>
  );
}
