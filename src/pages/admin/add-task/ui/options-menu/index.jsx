import React from "react";
import "./styles.css";

import { OptionalItem } from "../../../../../shared/ui";


export default function OptionalMenu(props) {
  return (
    <>
      <div className="style-optional-menu">
        {props.optionalMenuItems.map((items) => (
          <OptionalItem key={items.id} className="optional" optionalItem={items}/>
        ))}
      </div>
    </>
  );
}
