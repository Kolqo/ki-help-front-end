import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Test from "../pages/test/test.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <Test />
  </>
);
