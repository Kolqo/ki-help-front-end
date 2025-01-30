import React from "react";
import { useLocation } from "react-router-dom";
import "./styles.css";

import { Button, BuyHeader, Loading } from "../../../shared/ui";
import { GrayAdderIcon } from "../../../shared/assets/svg";
import { InputBox, TaskDescription } from "./ui";
import useInputFields from "./model/useInputFields";

export default function BuyingTest() {
  const { inputFields, addNewField } = useInputFields();

  const location = useLocation();
  const { task } = location.state || {};

  return (
    <>
      <div className="container-buying-test">
        <div className="buying-test">
          <BuyHeader name={task.title}>{task.teacher.subject.name}</BuyHeader>
          <TaskDescription description={task.description} />
          <InputBox inputFields={inputFields}/>
          <Button
            className="gray-button buying-test-button"
            leftIcon={<GrayAdderIcon />}
            onClick={addNewField}
          >
            Добавити одне запитання
          </Button>
        </div>
        <div className="buying-test-button-box">
          <Button
            className="blue-button buying-test-button"
            leftIcon={false && <Loading className="buying-test-spinner" />}
          >
            {false ? "Генерація" : "Відправити"}
          </Button>
        </div>
      </div>
    </>
  );
}
