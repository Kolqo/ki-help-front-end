import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./styles.css";

import { Button, BuyHeader, Loading } from "../../../shared/ui";
import { InputBox, TaskDescription } from "./ui";

export default function BuyingTask() {
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
      <div className="container-buying-task">
        <div className="buying-task">
          <BuyHeader name={task.title}>{task.teacher.subject.name}</BuyHeader>
          <TaskDescription description={task.description} />
          <InputBox task={task} />
        </div>
        <Button
          className="blue-button fixed-button"
          leftIcon={false && <Loading className="buying-task-spinner" />}
          onClick={handleGetClick}
        >
          {false ? "Генерація" : "Відправити"}
        </Button>
      </div>
    </>
  );
}
