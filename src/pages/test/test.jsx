import React, { useRef } from "react";
import "./test.css";
import LabelInput from "../../shared/ui/label-input";
import useEnterNavigation from "../../shared/modal/useEnterNavigation";

export default function Test() {
  const inputRefs = [useRef(null), useRef(null), useRef(null)];
  
  const { handleEnterKeyPress } = useEnterNavigation();

  return (
    <div className="container">
      <div className="screen">
        <LabelInput
          ref={inputRefs[0]}
          placeholder="Приклад: Козак Н.Б"
          onKeyDown={(e) => handleEnterKeyPress(e, inputRefs[1])}
        >
          Ініціали
        </LabelInput>

        <LabelInput
          ref={inputRefs[1]}
          placeholder="Приклад: Щось ще"
          onKeyDown={(e) => handleEnterKeyPress(e, inputRefs[2])}
        >
          Додаткові дані
        </LabelInput>

        <LabelInput
          ref={inputRefs[2]}
          placeholder="Приклад: Третій інпут"
          onKeyDown={(e) => handleEnterKeyPress(e, null)}
        >
          Ще один інпут
        </LabelInput>
      </div>
    </div>
  );
}
