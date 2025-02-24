import React, { useState } from "react";
import "./styles.css";
import { Button, ClassicInput, Loading } from "../../../../../shared/ui";

export default function PopupDeposit(props) {
  const [ valueInput, setValueInput ] = useState()
  console.log(valueInput)
  return (
    <>
      <div className="style-popup-deposit">
        <div className="content-popup-deposit">
          <div className="popup-deposit-text">
            <p>Введіть суму</p>
            <span>Введіть суму поповнення</span>
          </div>
          <ClassicInput placeholder="Сума" onChange={(e) => setValueInput(e.target.value)}/>
          <div className="popup-buttons">
            <Button
              className="gray-button popup-button"
              onClick={props.onCancel}
            >
              Скасувати
            </Button>
            <Button
              className="blue-button popup-button"
              onClick={() => props.onDeposit(valueInput, props.user.telegramId)}
             disabled={props.isLoading}
             leftIcon={props.isLoading && <Loading className="buying-task-spinner" />}
           >
             {props.isLoading ? "Поповняється" : "Поповнити"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
