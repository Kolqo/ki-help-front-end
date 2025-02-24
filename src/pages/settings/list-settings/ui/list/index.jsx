import React from "react";
import "./styles.css";

import { MenuSetting } from "../../../../../shared/ui";
import listSettings from "../../const/listSettings.jsx";
import useRoles from "../../../../../shared/model/useRoles.js";

export default function List() {
  const { isDeveloper, isAdmin } = useRoles()

  return (
    <div className="style-list">
      {listSettings.map((item) => {
        if (item.isForAdmin && !isAdmin()) return null;

        if (item.isForDeveloper && !isDeveloper()) return null;
        
        return <MenuSetting key={item.id} menuSetting={item} />;
      })}
    </div>
  );
}