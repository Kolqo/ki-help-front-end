import { Outlet } from "react-router-dom";
import "../index.css"

import { Navbar } from "../../shared/ui";

export default function MainLayout() {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
};