import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import { ActionSwitch, RangeSlider } from "../../../../../shared/ui";
import { Button } from "../../../../../shared/ui";

import { useRangeSlider, useToggle } from "../../../../../shared/model";
import { usePriceActions } from "../../model/usePriceActions.js"; 

export default function Price(props) {
  const { state, toggle } = useToggle();
  const navigate = useNavigate();
  const { handleDoneClick } = usePriceActions();

  const {
    value,
    setValue,
    sliderRef,
    handleMouseOrTouchDown,
    handleClickOnLine,
    percentage,
    max,
  } = useRangeSlider(100, 1);

  const moreOrLess = state === false ? "=>" : "<=";

  return (
    <div className="style-price">
      <div className="price">
        <span>{moreOrLess}</span>
        {value}₴
      </div>
      <div className="bottom-controls">
        <ActionSwitch
          leftText="<="
          rightText="=>"
          isSwitch={state}
          setIsSwitch={toggle}
        />
        <RangeSlider
          value={value}
          max={max}
          percentage={percentage}
          sliderRef={sliderRef}
          handleClickOnLine={handleClickOnLine}
          handleMouseOrTouchDown={handleMouseOrTouchDown}
          setValue={setValue}
        />
        <div className="no-underline price-button-box">
          <Button
            className="blue-button price-button"
            onClick={handleDoneClick(moreOrLess, value, props.subjectID, navigate)}
          >
            Готово
          </Button>
        </div>
      </div>
    </div>
  );
}