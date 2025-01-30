import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "../index.css"

import { routerList } from "./router-list";

export const MyAppRouter = () => {

  return (
    <div className="container">
      <div className="screen">
        <RouterProvider router={createBrowserRouter(routerList)} />
      </div>
    </div>
  );
};
