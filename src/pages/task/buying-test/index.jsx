import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./styles.css";

import { Button, BuyHeader, Loading } from "../../../shared/ui";
import { AdderIcon } from "../../../shared/assets/svg";
import { InputBox, TaskDescription } from "./ui";
import useInputFields from "./model/useInputFields";

export default function BuyingTest() {
  const { inputFields, addNewField } = useInputFields();
  
  const location = useLocation();
  const navigate = useNavigate();
  const { task } = location.state || {};
  const { subjectID, buying } = useParams();

  const handleGetClick = (e) => {
    e.preventDefault();
    navigate(`/list-task/${subjectID}/${buying}/buying-result`, 
    {
      state: { task: task },
    });
  };


  return (
    <>
      <div className="container-buying-test">
        <div className="buying-test">
          <BuyHeader name={task.title}>{task.teacher.subject.name}</BuyHeader>
          <TaskDescription description={task.description} />
          <InputBox inputFields={inputFields}/>
          <Button
            className="gray-button buying-test-button"
            leftIcon={<AdderIcon />}
            onClick={addNewField}
          >
            Добавити одне запитання
          </Button>
        </div>
        <div className="buying-test-button-box">
          <Button
            className="blue-button buying-test-button"
            leftIcon={false && <Loading className="buying-test-spinner" />}
            onClick={handleGetClick}
          >
            {false ? "Генерація" : "Відправити"}
          </Button>
        </div>
      </div>
    </>
  );
}
