import React from "react";
import "./styles.css";
import AIIcon from "../assets/ai-icon";
import { Button } from "../../../shared/ui";
import { useNavigate } from "react-router-dom";

export default function Task(props) {
  const navigate = useNavigate();

  const isRegular =
    props.task.type === "REGULAR" ? "buying-task" : "buying-test";

  const handleBuyClick = (e) => {
    e.preventDefault();
    navigate(`/list-task/${props.subjectID}/${isRegular}`, 
    {
      state: { task: props.task },
    });
  };

  return (
    <div className="class-task">
      <div className="task-header">
        <div className="task-info">
          <p>{props.task.title}</p>
          <span>Вартість {props.task.price}грн</span>
        </div>
        <Button
          className="task-button-buy blue-button no-select"
          onClick={handleBuyClick} 
        >
          Придбати
        </Button>
      </div>
      <div className="task-footer">
        <p>Створено: @{props.task.developerName}</p>
        {props.task.autoGenerate && <AIIcon />}
      </div>
    </div>
  );
}
