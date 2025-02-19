import React from "react";
import "./styles.css";
import { Button, ClassicInput } from "../../../../../shared/ui";

export default function PopupDiscount(props) {
  return (
    <>
      <div className="style-popup-discount">
        <div className="content-popup-discount">
          <div className="popup-discount-text">
            <p>Кількість активацій</p>
            <span>Напишіть кількісь активацій знижки</span>
          </div>
          <ClassicInput placeholder="Введіть кількість" />
          <div className="popup-buttons">
            <Button
              className="gray-button popup-button"
              onClick={props.onClickCancel}
            >
              Скасувати
            </Button>
            <Button
              className="blue-button popup-button"
              onClick={props.onClickGive}
            >
              Видати
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
