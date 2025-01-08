import React, { useRef, useState } from "react";
import "./test.css";
//import Element from "../../entities/news-item/ui/index";
import Element from "../../shared/ui/switch/mode-switch";
import { AdderIcon } from "../../shared/assets/svg";
import useToggle from "../../shared/modal/useToggle";
import autoAuth from "../../features/auth/api"

export default function Test() {
  const {state, toggle} = useToggle();
  autoAuth()

  return (
    <div className="container">
      <div className="screen">
        <Element isSwitch={state} setIsSwitch={toggle}>
        </Element>
      </div>
    </div>
  );
}
