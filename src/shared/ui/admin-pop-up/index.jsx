import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function AdminPopup(props) {
  return (
    <>
      {props.showPopup && (
        <div
          className="style-admin-popup"
          style={{ top: props.popupPosition.y, left: props.popupPosition.x }}
        >
          <Link
            to={props.topTo}
            className="option no-underline no-focus-and-active"
          >
            {props.adminPopup.topIcon}
            <p>{props.adminPopup.topText}</p>
          </Link>
          <Link
            to={props.bottomTo}
            className="option no-underline no-focus-and-active"
          >
            {props.adminPopup.bottomIcon}
            <p>{props.adminPopup.bottomText}</p>
          </Link>
        </div>
      )}
    </>
  );
}