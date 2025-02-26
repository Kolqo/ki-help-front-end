import React from "react";
import "./styles.css";

import { RulesList } from "./ui";

import { useGoBack } from "../../../shared/model";

export default function Rules(props) {
  useGoBack(props.isFirstOpen ? `/` : `/settings`);

  return (
    <div className="container-rules">
      <RulesList/>
    </div>
  );
}