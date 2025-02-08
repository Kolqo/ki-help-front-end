import { useParams } from "react-router-dom";

import MainLayout from "./logout"; 

import { ListSubject, ListTask, Filtering, BuyingTask, BuyingTest, BuyingResult } from "../../pages/task";
import { BalanceAndTransaction, Deposit, Withdraw } from "../../pages/wallet";
import { InvitedPeople, Invite } from "../../pages/invitation";
import { ListSetting, HistoryTask, Support, AdminPanel, ProfileUser, GiveRole, DevPanel, BalanceAndTransactionAdmin} from "../../pages/settings";

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
  {
    path: "/invitation/invite",
    element: (
      <Invite/>
    ),
  },
  {
    path: "/settings/history-task",
    element: (
      <HistoryTask/>
    ),
  },
  {
    path: "/settings/support",
    element: (
      <Support/>
    ),
  },
  {
    path: "/settings/admin-panel",
    element: (
      <AdminPanel/>
    ),
  },
  {
    path: "/settings/admin-panel/profile",
    element: (
      <ProfileUser/>
    ),
  },
  {
    path: "/settings/admin-panel/profile/wallet",
    element: (
      <BalanceAndTransactionAdmin/>
    ),
  },
  {
    path: "/settings/admin-panel/profile/history-task",
    element: (
      <HistoryTask/>
    ),
  },
  {
    path: "/settings/admin-panel/profile/give-role",
    element: (
      <GiveRole/>
    ),
  },
  {
    path: "/settings/dev-panel",
    element: (
      <DevPanel/>
    ),
  },
];