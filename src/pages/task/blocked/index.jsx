import React from "react";
import "./styles.css";

import BlockingNavigation from "./ui/blocking-navigation"

export default function Blocked() {

  return (
    <>
      <div className="container-blocked">
        <BlockingNavigation/>
      </div>
    </>
  );
}
