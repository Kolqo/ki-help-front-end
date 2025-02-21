import { RouterProvider } from "react-router-dom";
import "../index.css";

import useRouterConfig from "../model/useRouterConfig.jsx";

export const MyAppRouter = () => {
  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const tg = window.Telegram.WebApp
  const version = parseFloat(tg.version);
  const hasMobileFeatures = isMobile && version > 7.1;

  tg.expand();

  if (hasMobileFeatures) {
    tg.requestFullscreen();
  }

  const mobilePadding = hasMobileFeatures ? "mobile-padding" : "";

  const router = useRouterConfig();

  if (!router) {
    return <div>Щось</div>;
  }

  return (
    <div className="container">
      <div className={`screen ${mobilePadding}`}>
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default MyAppRouter;
