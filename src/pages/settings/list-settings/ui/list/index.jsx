import React from "react";
import "./styles.css";

import { MenuSetting } from "../../../../../shared/ui";
import listSettings from "../../const/listSettings.jsx";
import { Link } from "react-router-dom";

export default function List() {
  return (
    <>
      <div className="style-list"> 
        {listSettings.map((item) => (
          <Link className="no-underline" to={item.to} key={item.id}>
            <MenuSetting menuSetting={item}/>
          </Link>
        ))}
      </div>
    </>
  );
}