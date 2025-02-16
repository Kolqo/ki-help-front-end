import { useParams } from "react-router-dom";

import MainLayout from "./logout";

import {
  ListSubject,
  ListTask,
  Filtering,
  BuyingTask,
  BuyingTest,
  BuyingResult,
  Blocked,
  ChooseCourse,
} from "../../pages/task";
import { BalanceAndTransaction, Deposit, Withdraw } from "../../pages/wallet";
import { InvitedPeople, Invite } from "../../pages/invitation";
import {
  ListSetting,
  HistoryTask,
  Support,
  AdminPanel,
  ProfileUser,
  GiveRole,
  DevPanel,
  BalanceAndTransactionAdmin,
} from "../../pages/settings";
import {
  EditSubject,
  EditTeacher,
  EditTask,
  EditArgument,
  GiveDiscount,
  ChooseUser,
  AddSubject,
  AddTeacher,
  AddTask,
  ChooseArgument,
  ChooseDeveloper,
  ChooseType,
  AddArgument,
} from "../../pages/admin";

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
    path: "/choose-course",
    element: <ChooseCourse />,
  },
  {
    path: "/list-task/:subjectID",
    element: <ListTask />,
  },
  {
    path: "/list-task/:subjectID/filtering/:filterID",
    element: <Filtering />,
  },
  {
    path: "/list-task/:subjectID/:buying",
    element: <Buying />,
  },
  {
    path: "/list-task/:subjectID/:buying/buying-result",
    element: <BuyingResult />,
  },
  {
    path: "/wallet/deposit",
    element: <Deposit />,
  },
  {
    path: "/wallet/withdraw",
    element: <Withdraw />,
  },
  {
    path: "/invitation/invite",
    element: <Invite />,
  },
  {
    path: "/settings/history-task",
    element: <HistoryTask />,
  },
  {
    path: "/settings/support",
    element: <Support />,
  },
  {
    path: "/settings/admin-panel",
    element: <AdminPanel />,
  },
  {
    path: "/settings/admin-panel/profile",
    element: <ProfileUser />,
  },
  {
    path: "/settings/admin-panel/profile/wallet",
    element: <BalanceAndTransactionAdmin />,
  },
  {
    path: "/settings/admin-panel/profile/history-task",
    element: <HistoryTask />,
  },
  {
    path: "/settings/admin-panel/profile/give-role",
    element: <GiveRole />,
  },
  {
    path: "/settings/dev-panel",
    element: <DevPanel />,
  },
  {
    path: "/edit-subject",
    element: <EditSubject />,
  },
  {
    path: "/add-subject",
    element: <AddSubject />,
  },
  {
    path: "/edit-teacher",
    element: <EditTeacher />,
  },
  {
    path: "/add-teacher",
    element: <AddTeacher />,
  },
  {
    path: "/edit-task",
    element: <EditTask />,
  },
  {
    path: "/edit-task/give-discount",
    element: <GiveDiscount />,
  },
  {
    path: "/edit-task/give-discount/choose-user",
    element: <ChooseUser />,
  },
  {
    path: "/edit-task/choose-developer",
    element: <ChooseDeveloper />,
  },
  {
    path: "/add-task",
    element: <AddTask />,
  },
  {
    path: "/add-task/choose-argument",
    element: <ChooseArgument />,
  },
  {
    path: "/add-task/choose-argument/edit-argument",
    element: <EditArgument />,
  },
  {
    path: "/add-task/choose-argument/add-argument",
    element: <AddArgument />,
  },
  {
    path: "/add-task/choose-developer",
    element: <ChooseDeveloper />,
  },
  {
    path: "/add-task/choose-type",
    element: <ChooseType />,
  },
];
