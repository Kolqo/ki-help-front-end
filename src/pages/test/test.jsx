import React, { useRef } from "react";
import "./test.css";
import Element from "../../entities/news-item/ui/index";
//import Element from "../../shared/ui/property-item";
import Icon from "../../shared/assets/placeholder";

export default function Test() {
  return (
    <div className="container">
      <div className="screen">
        <Element
          newsName="Оновлений дизайн"
          newsText="Спробуй новий дизайн та відчуй 
          усі переваги зручності й стилю! 🚀"
        ></Element>
      </div>
    </div>
  );
}
