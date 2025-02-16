import React from "react";
import "./styles.css";

import RedCross from "../../assets/tgs/RedCross.tgs"
import { Tgs } from "../../../../../shared/ui"

export default function BlockingNavigation() {

  return (
    <>
      <div className="style-blocking-navigation">
        <Tgs src={RedCross} isLoop isAutoplay></Tgs>
        <p>Ви були заблоковані через недотримання правил встановленими в боті KIHelp</p>
      </div>
    </>
  );
}
