import { RouterProvider } from "react-router-dom";
import "../index.css";

import useRouterConfig from "../model/useRouterConfig.jsx";

import { Loading, Blocked } from "../../pages/task";
import { useRoles } from "../../shared/model";

export const MyAppRouter = () => {
  const userAgent = navigator.userAgent;
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  const tg = window.Telegram.WebApp;
  const version = parseFloat(tg.version);
  const hasMobileFeatures = isMobile && version > 7.1;

  tg.expand();

  if (hasMobileFeatures) {
    tg.requestFullscreen();
  }

  const mobilePadding = hasMobileFeatures ? "mobile-padding" : "";

  const router = useRouterConfig();

  const { jwt } = useRoles();

  console.log(jwt)
  if (jwt?.ban) {
    return (
      <div className="container">
        <div className={`screen ${mobilePadding}`}>
          <Blocked />
        </div>
      </div>
    );
  } else {
    if (!router) {
      return <Loading />;
    }
  
    return (
      <div className="container">
        <div className={`screen ${mobilePadding}`}>
          <RouterProvider router={router} />
        </div>
      </div>
    );
  }
};

export default MyAppRouter;
