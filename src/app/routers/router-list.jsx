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
  ChooseCreator,
  ChooseTeacher,
  ChoosePrice,
  Loading,
  Rules
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

export const routerList = (userCourse) => [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <ListSubject userCourse={userCourse}/>,
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
    path: "/loading",
    element: <Loading />,
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
    path: "/list-task/:subjectID/choose-teacher",
    element: <ChooseTeacher />,
  },
  {
    path: "/list-task/:subjectID/choose-creator",
    element: <ChooseCreator />,
  },
  {
    path: "/list-task/:subjectID/choose-price",
    element: <ChoosePrice />,
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
    path: "/settings/rules",
    element: <Rules />,
  },
  {
    path: "/edit-subject",
    element: <EditSubject />,
  },
  {
    path: "/list-task/edit-task/:subjectID",
    element: <EditTask />,
  },
  {
    path: "/list-task/edit-task/:subjectID/choose-developer",
    element: <ChooseDeveloper isEdit/>,
  },
  {
    path: "/list-task/edit-task/:subjectID/give-discount",
    element: <GiveDiscount />,
  },
  {
    path: "/list-task/edit-task/:subjectID/give-discount/choose-user",
    element: <ChooseUser />,
  },
  {
    path: "/add-subject",
    element: <AddSubject />,
  },
  {
    path: "/list-task/:subjectID/choose-teacher/edit-teacher",
    element: <EditTeacher />,
  },
  {
    path: "/list-task/:subjectID/choose-teacher/add-teacher",
    element: <AddTeacher />,
  },
  {
    path: "/list-task/add-task/:subjectID",
    element: <AddTask />,
  },
  {
    path: "/list-task/add-task/:subjectID/choose-argument",
    element: <ChooseArgument />,
  },
  {
    path: "/list-task/add-task/:subjectID/choose-argument/edit-argument",
    element: <EditArgument />,
  },
  {
    path: "/list-task/add-task/:subjectID/choose-argument/add-argument",
    element: <AddArgument />,
  },
  {
    path: "/list-task/add-task/:subjectID/choose-developer",
    element: <ChooseDeveloper />,
  },
  {
    path: "/list-task/add-task/:subjectID/choose-type",
    element: <ChooseType />,
  },
];
