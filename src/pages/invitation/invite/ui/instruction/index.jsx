import React from "react";
import "./styles.css";

import instructionPoints from "../../const/instructionPoints";

export default function Instruction() {
  return (
    <>
      <div className="style-instruction">
        <p>Три прості кроки</p>
        <div className="instruction">
          {instructionPoints.map((item) => (
            <div key={item.id} className="point">
              <div className="number">{item.id}</div>
              <div className="text">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
