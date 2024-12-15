import React, { useRef } from "react";
import "./test.css";
import Element from "../../shared/ui/navbar";
import Swapper from "../../shared/ui/swapper";
import useEnterNavigation from "../../shared/modal/useEnterNavigation";
import Icon from "../../shared/assets/placeholder"

export default function Test() {


  return (
    <div className="container">
      <div className="screen">
        <Element icon={<Icon/>}></Element>
      </div>
    </div> 
  );
}
