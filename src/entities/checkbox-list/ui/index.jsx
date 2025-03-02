import React from "react";
import "./styles.css";

import { Checkbox } from "../../../shared/ui";

export default function CheckboxList(props) {
  return (
    <>
      <div
        className={`class-checkbox-list ${props.className || ""}`}
        onContextMenu={(e) =>
          props.menuState?.handleContextMenu(e, props.item?.id)
        }
        onTouchStart={(e) =>
          props.menuState?.handleTouchStart(e, props.item?.id)
        }
        onTouchEnd={props.menuState?.handleTouchEnd}
        onTouchMove={props.menuState?.handleTouchMove}
      >
        <Checkbox
          isChecked={props.isChecked}
          setIsChecked={props.setIsChecked}
        ></Checkbox>
        <p>{props.children}</p>
      </div>
    </>
  );
}
