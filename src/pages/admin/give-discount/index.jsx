import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { ActionSwitch, Button, RangeSlider } from "../../../shared/ui";

import { useRangeSlider, useToggle } from "../../../shared/model";

export default function GiveDiscount() {
  const { state, toggle } = useToggle();

  const navigate = useNavigate();

  const {
    value,
    setValue,
    sliderRef,
    handleMouseOrTouchDown,
    handleClickOnLine,
    percentage,
    max,
  } = useRangeSlider(100, 1);

  return (
    <>
      <div className="container-give-discount">
        <div className="content">
          <ActionSwitch
            isSwitch={state}
            setIsSwitch={toggle}
            leftText="Глобальна"
            rightText="Локальна"
          />
          <div className="value-box">
            <p>{`${value}%`}</p>
          </div>
        </div>
        <div className="action">
          <RangeSlider
            value={value}
            max={max}
            percentage={percentage}
            sliderRef={sliderRef}
            handleClickOnLine={handleClickOnLine}
            handleMouseOrTouchDown={handleMouseOrTouchDown}
            setValue={setValue}
          />
          <Button
            className="blue-button give-discount-button"
            onClick={() => navigate(`/edit-task`)}
          >
            Добавити
          </Button>
          {!state && (
            <Button
              className="gray-button give-discount-button"
              onClick={() => navigate(`/edit-task/give-discount/choose-user`)}
            >
              Переглянути користувачів
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
