import React from "react";
import "./styles.css";

import { OptionalItem } from "../../../../../shared/ui";

import optionalMenuItems from "../../const/optionalMenuItems.jsx"


export default function OptionalMenu() {
  return (
    <>
      <div className="style-optional-menu">
        {optionalMenuItems.map((items) => (
          <OptionalItem className="optional" optionalItem={items}/>
        ))}
      </div>
    </>
  );
}
