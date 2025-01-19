import React, { useRef, useState } from "react";
import "./test.css";
//import Element from "../../entities/news-item/ui/index";
import Element from "../../shared/ui/switch/mode-switch";
import { AdderIcon } from "../../shared/assets/svg";
import useToggle from "../../shared/modal/useToggle";
import useAutoAuth from "../../features/auth/model/useAutoAuth"

export default function Test() {
  const {state, toggle} = useToggle();
  useAutoAuth();
  
  return (
    <div className="container">
      <div className="screen">
        <Element isSwitch={state} setIsSwitch={toggle}>
        </Element>
      </div>
    </div>
  );
}
