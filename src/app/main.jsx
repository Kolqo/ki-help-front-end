import React from "react";
import ReactDOM from "react-dom/client";

import { MyAppRouter } from "./routers";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <MyAppRouter/>
);
