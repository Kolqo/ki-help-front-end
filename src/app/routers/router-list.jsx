import { useParams } from "react-router-dom";

import MainLayout from "./logout"; 

import { ListSubject, ListTask, Filtering, BuyingTask, BuyingTest, BuyingResult } from "../../pages/task";
import { BalanceAndTransaction, Deposit, Withdraw } from "../../pages/wallet";
import { InvitedPeople } from "../../pages/invitation";
import { ListSetting } from "../../pages/settings";

const Buying = () => {
  const { buying } = useParams();

  return buying === "buying-task" ? <BuyingTask /> : <BuyingTest />;
};


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
      <Buying/>
    ),
  },
  {
    path: "/list-task/:subjectID/:buying/buying-result",
    element: (
      <BuyingResult/>
    ),
  },
  {
    path: "/wallet/deposit",
    element: (
      <Deposit/>
    ),
  },
  {
    path: "/wallet/withdraw",
    element: (
      <Withdraw/>
    ),
  },
];