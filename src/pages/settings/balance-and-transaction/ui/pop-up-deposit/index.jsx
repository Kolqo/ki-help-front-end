import React from "react";
import "./styles.css";
import { Button, ClassicInput } from "../../../../../shared/ui";

export default function PopupDeposit(props) {
  return (
    <>
      <div className="style-popup-deposit">
        <div className="content-popup-deposit">
          <div className="popup-deposit-text">
            <p>Введіть суму</p>
            <span>Введіть суму поповнення</span>
          </div>
          <ClassicInput placeholder="Сума" />
          <div className="popup-buttons">
            <Button
              className="gray-button popup-button"
              onClick={props.onClick}
            >
              Скасувати
            </Button>
            <Button
              className="blue-button popup-button"
              onClick={props.onClick}
            >
              Поповнити
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
