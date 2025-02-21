import React from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

import { ActionSwitch, RangeSlider, Button } from "../../../shared/ui";

import { useRangeSlider, useToggle, useGoBack} from "../../../shared/model";
import { usePriceActions } from "./model/usePriceActions.js"; 

export default function Price() {
  const { subjectID } = useParams();
  useGoBack(`/list-task/${subjectID}`);
  const { state, toggle } = useToggle();
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
            onClick={handleDoneClick(moreOrLess, value, subjectID)}
          >
            Готово
          </Button>
        </div>
      </div>
    </div>
  );
}