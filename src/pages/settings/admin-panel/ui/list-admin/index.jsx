import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import { MenuSetting } from "../../../../../shared/ui"
import listAdminOptional from "../../const/listAdminOptional";

export default function ListAdmin() {
  return (
    <>
      <div className="container-list-admin">
        {listAdminOptional.map((item) => (
          <Link className="no-underline" to={item.to} key={item.id}>
            <MenuSetting menuSetting={item} />
          </Link>
        ))}
      </div>
    </>
  );
}
