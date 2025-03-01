import React from "react";
import "./styles.css";

import { OptionalItem } from "../../../../../shared/ui";

import optionalMenuItems from "../../const/optionalMenuItems.jsx"


export default function OptionalMenu(props) {
  console.log(props.subjectID);
  return (
    <>
      <div className="style-optional-menu">
        {optionalMenuItems(props.subjectID).map((items) => (
          <OptionalItem key={items.id} className="optional" optionalItem={items}/>
        ))}
      </div>
    </>
  );
}
