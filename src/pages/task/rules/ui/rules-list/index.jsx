import React from "react";
import "./styles.css";

import rulesItems from "../../const/ruleItems.jsx"

export default function RulesList() {
  return (
    <div className="style-rules-list">
      {rulesItems.map((item) => (
        <div key={item.id} className="rule-point">
          <p>{item.title}</p>
          {item.text.map((text, index) => (
            <div key={index}>{text}</div>
          ))}
        </div>
      ))}
    </div>
  );
}