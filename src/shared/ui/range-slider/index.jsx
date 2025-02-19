import React from "react";
import "./styles.css";

export default function RangeSlider(props) {
  return (
    <div className="style-range-slider" ref={props.sliderRef}>
      <div
        className="line-container"
        onClick={props.handleClickOnLine}
      >
        <div
          className="line"
          style={{
            background: `linear-gradient(to right, white 0%, white ${props.percentage}%, var(--ui-special-ft-bg) ${props.percentage}%, var(--ui-special-ft-bg) 100%)`,
          }}
        />
        <div
          className="slider-thumb"
          style={{ left: `${props.percentage}%` }}
          onMouseDown={props.handleMouseOrTouchDown}
          onTouchStart={props.handleMouseOrTouchDown}
        />
      </div>
      <div className="points">
        {[...Array(5)].map((_, index) => {
          const pointValue = index * (props.max / 4);
          return (
            <div
              className="point"
              key={index}
              onClick={() => props.setValue(pointValue)}
            >
              <div
                className={`circle ${
                  pointValue <= props.value ? "circle-active" : ""
                } ${pointValue === props.value ? "circle-choose" : ""}`}
              />
              <p>{pointValue}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}