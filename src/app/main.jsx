import React from "react";
import ReactDOM from "react-dom/client";

import { MyAppRouter } from "./routers";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find root element");
}

if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    document.body.style.height = window.visualViewport.height + 'px';
  });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) window.scrollTo(0, 0);
});

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <MyAppRouter/>
  </React.StrictMode>
);
