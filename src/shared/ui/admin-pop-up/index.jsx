import React from "react";
import "./styles.css";

export default function AdminPopup(props) {
  return (
    <>
      {props.showPopup && (
        <div
          className="style-admin-popup no-select"
          style={{ top: props.popupPosition.y, left: props.popupPosition.x }}
        >
          <div
            to={props.topTo}
            className="option no-underline no-focus-and-active"
            onClick={props.onClickTop}
          >
            {props.adminPopup.topIcon}
            <p>{props.adminPopup.topText}</p>
          </div>
          <div
            to={props.bottomTo}
            className="option no-underline no-focus-and-active"
            onClick={props.onClickBottom}
          >
            {props.adminPopup.bottomIcon}
            <p>{props.adminPopup.bottomText}</p>
          </div>
        </div>
      )}
    </>
  );
}