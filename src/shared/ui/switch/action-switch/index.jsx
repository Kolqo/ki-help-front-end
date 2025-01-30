import React from 'react';
import './styles.css';

export default function ActionSwitch(props) {
  return (
    <div className="class-action-switch">
      <button
        className={`action-switch-button no-select ${props.isSwitch ? 'action-switch-active' : ''}`}
        onClick={props.setIsSwitch}
      >
        {props.leftText}
      </button>
      <button
        className={`action-switch-button no-select ${!props.isSwitch ? 'action-switch-active' : ''}`}
        onClick={props.setIsSwitch}
      >
        {props.rightText}
      </button>
    </div>
  );
};
