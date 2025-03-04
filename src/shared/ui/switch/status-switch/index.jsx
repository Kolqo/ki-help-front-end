import React from "react";
import "./styles.css";

export default function StatusSwitch(props) {
  return (
    <div className="class-status-switch">
      <input 
        type="checkbox" 
        id="toggle-button" 
        className="status-switch"
        checked={props.isSwitch}
        onChange={() => props.setIsSwitch(prevState => !prevState)} />
    </div>
  );
}
