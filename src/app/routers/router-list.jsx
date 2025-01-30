import MainLayout from "./logout"; 

import { ListSubject, ListTask, Filtering, BuyingTask, BuyingTest, BuyingResult } from "../../pages/task";
import { BalanceAndTransaction } from "../../pages/wallet";
import { InvitedPeople } from "../../pages/invitation";
import { ListSetting } from "../../pages/settings";

export const routerList = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <ListSubject />,
      },
      {
        path: "/wallet",
        element: <BalanceAndTransaction />,
      },
      {
        path: "/invitation",
        element: <InvitedPeople />,
      },
      {
        path: "/settings",
        element: <ListSetting />,
      },
    ],
    
  },
  {
    path: "/list-task/:subjectID",
    element: (
      <ListTask/>
    ),
  },
  {
    path: "/list-task/:subjectID/filtering/:filterID",
    element: (
      <Filtering/>
    ),
  },
  {
    path: "/list-task/:subjectID/:buying",
    element: (
      <BuyingTask/>
    ),
  },
  {
    path: "/list-task/:subjectID/:buying",
    element: (
      <BuyingTest/>
    ),
  },
  {
    path: "/list-task/:subjectID/:buying/buying-result",
    element: (
      <BuyingResult/>
    ),
  },
];