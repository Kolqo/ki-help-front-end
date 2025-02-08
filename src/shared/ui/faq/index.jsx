import React from "react";
import "./styles.css";

import useToggle from "../../model/useToggle.js";

export default function FAQ(props) {
  const { state, toggle } = useToggle();

  return (
    <div className={`style-faq ${state ? 'expanded' : 'collapsed'}`}>
      <div className="faq-question" onClick={toggle}>
        {props.faq.question}
        {props.icon}
      </div>
      <div className="faq-answer-wrapper">
        <div className="faq-answer"> 
          {props.faq.answer}
        </div>
      </div>
    </div>
  );
}