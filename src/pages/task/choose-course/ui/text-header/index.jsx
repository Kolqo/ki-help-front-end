import React from "react";
import "./styles.css";

import WriteAndHand from "../../assets/tgs/WriteAndHand.tgs"
import { Tgs } from "../../../../../shared/ui";

export default function TextHeader() {

  return (
    <>
      <div className="style-text-header">
        <Tgs src={WriteAndHand} isLoop isAutoplay></Tgs>
        <p>Оберіть свій курс</p>
        <span>Виберіть один із чотирьох курсів</span>
      </div>
    </>
  );
}
