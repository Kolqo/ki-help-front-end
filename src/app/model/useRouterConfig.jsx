import { useState, useEffect } from "react";
import { createBrowserRouter } from "react-router-dom";

import { getUserCourse } from "../../entities/user/api";
import { ChooseCourse } from "../../pages/task";
import { routerList } from "../routers/router-list";

import autoAuth from "../../features/auth/api/autoAuth.js";

const useRouterConfig = () => {
  const [userCourse, setUserCourse] = useState(null);

  useEffect(() => {
    const authenticateAndFetchCourse = async () => {
      try {
        await autoAuth();
        console.log('Авторизація успішна');
        const course = await getUserCourse();
        setUserCourse(course)
      } catch (error) {
        console.error('Помилка:', error);
      }
    };
    authenticateAndFetchCourse();
  }, []);

  if (userCourse === null) {
    return null; 
  }

  const currentRouterList = userCourse === 0
    ? [{ path: "", element: <ChooseCourse setUserCourse={setUserCourse}/> }]
    : routerList(userCourse);

  const router = createBrowserRouter(currentRouterList);
  return router;
};

export default useRouterConfig;