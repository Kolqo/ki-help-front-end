import React from 'react';
import './styles.css';

export default function ModeSwitch(props) {
  return (
    <div className="class-mode-switch">
      <button
        className={`mode-switch-button no-select ${props.isSwitch ? 'mode-switch-active' : ''}`}
        onClick={props.setIsSwitch}
      >
        Редагувати
      </button>
      <button
        className={`mode-switch-button no-select ${!props.isSwitch ? 'mode-switch-active' : ''}`}
        onClick={props.setIsSwitch}
      >
        Видалити
      </button>
    </div>
  );
};
