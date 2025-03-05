import React, { useRef } from "react";
import { LabelInput } from "../";
import "./styles.css"; 

export default function InputGroup (props) {
  const inputRefs = useRef([]);
  
  inputRefs.current = props.fields.map((_, i) => 
    inputRefs.current[i] || React.createRef()
  );

  return (
    <div className="style-input-group">  
      {props.fields.map((field, index) => {
        const isLast = index === props.fields.length - 1;
        const nextRef = isLast ? null : inputRefs.current[index + 1];

        return (
          <LabelInput
            key={index}
            ref={inputRefs.current[index]}
            nextInputRef={nextRef}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(value) => props.onChange(index, value)}
          >
            {field.label}
          </LabelInput>
        );
      })}
    </div>
  );
};