import React from "react";
import "./styles.css";

import ListAdmin from "./ui/list-admin";

export default function AdminPanel() {
  return (
    <>
      <div className="container-admin-panel"> 
        <ListAdmin/>
      </div>
    </>
  );
}