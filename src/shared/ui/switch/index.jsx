import React from 'react';
import './styles.css';

export default function Switch(props) {
  return (
    <div className="class-switch">
      <button
        className={`switch-button no-select ${props.isSwitch ? 'switch-active' : ''}`}
        onClick={props.setIsSwitch}
      >
        Редагувати
      </button>
      <button
        className={`switch-button no-select ${!props.isSwitch ? 'switch-active' : ''}`}
        onClick={props.setIsSwitch}
      >
        Видалити
      </button>
    </div>
  );
};
