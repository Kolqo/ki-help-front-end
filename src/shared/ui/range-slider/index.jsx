import React from "react";
import "./styles.css";
import { useRangeSlider } from "../../modal/useRangeSlider";

export default function RangeSlider() {
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
    <div className="style-range-slider" ref={sliderRef}>
      <div
        className="line-container"
        onClick={handleClickOnLine}
      >
        <div
          className="line"
          style={{
            background: `linear-gradient(to right, var(--range-slider-active-bg) 0%, var(--range-slider-active-bg) ${percentage}%, var(--range-slider-nonactive-bg) ${percentage}%, var(--range-slider-nonactive-bg) 100%)`,
          }}
        />
        <div
          className="slider-thumb"
          style={{ left: `${percentage}%` }}
          onMouseDown={handleMouseOrTouchDown}
          onTouchStart={handleMouseOrTouchDown}
        />
      </div>
      <div className="points">
        {[...Array(5)].map((_, index) => {
          const pointValue = index * (max / 4);
          return (
            <div
              className="point"
              key={index}
              onClick={() => setValue(pointValue)}
            >
              <div
                className={`circle ${
                  pointValue <= value ? "circle-active" : ""
                } ${pointValue === value ? "circle-choose" : ""}`}
              />
              <p>{pointValue}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
