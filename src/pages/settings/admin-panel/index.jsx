import React from "react";
import "./styles.css";

import ListAdmin from "./ui/list-admin";
import { useGoBack } from "../../../shared/model";

export default function AdminPanel() {
  useGoBack(`/settings`);
  return (
    <>
      <div className="container-admin-panel"> 
        <ListAdmin/>
      </div>
    </>
  );
}