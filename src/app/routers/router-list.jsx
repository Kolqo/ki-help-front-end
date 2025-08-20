import { useParams } from 'react-router-dom'

import MainLayout from './logout'

import {
	ListSubject,
	ListTask,
	Filtering,
	Buying,
	BuyingResult,
	ChooseCourse,
	Loading,
	Rules,
} from '../../pages/task'

import {
	BalanceAndTransaction,
	Payments,
	SettingPayments,
} from '../../pages/wallet'

import {
	ListSetting,
	HistoryTask,
	Support,
	AdminPanel,
	ProfileUser,
	GiveRole,
	DevPanel,
	BalanceAndTransactionAdmin,
} from '../../pages/settings'

import {
	ChooseArgument,
	ChooseDeveloper,
	ChooseFile,
	SubjectForm,
	TeacherForm,
	TaskForm,
	ArgumentForm,
	AddFile,
} from '../../pages/admin'

export const routerList = (userCourse, setUserCourse) => {
	if (userCourse === 0) {
		return [
			{
				path: '*',
				element: <ChooseCourse setUserCourse={setUserCourse} />,
			},
		]
	}

	return [
		{
			element: <MainLayout />,
			children: [
				{
					path: '/',
					element: <ListSubject userCourse={userCourse} />,
				},
				{
					path: '/wallet',
					element: <BalanceAndTransaction />,
				},
				{
					path: '/settings',
					element: <ListSetting />,
				},
			],
		},
		{
			path: '/choose-course',
			element: <ChooseCourse />,
		},
		{
			path: '/rules',
			element: <Rules />,
		},
		{
			path: '/loading',
			element: <Loading />,
		},
		{
			path: '/list-task/:subjectID',
			element: <ListTask />,
		},
		{
			path: '/list-task/:subjectID/filtering',
			element: <Filtering />,
		},
		{
			path: '/list-task/:subjectID/buying',
			element: <Buying />,
		},
		{
			path: '/list-task/:subjectID/buying/buying-result',
			element: <BuyingResult />,
		},

		{
			path: '/wallet/payments/setting-payments',
			element: <SettingPayments />,
		},
		{
			path: '/wallet/payments',
			element: <Payments />,
		},
		{
			path: '/settings/history-task',
			element: <HistoryTask />,
		},
		{
			path: '/settings/support',
			element: <Support />,
		},
		{
			path: '/settings/admin-panel',
			element: <AdminPanel />,
		},
		{
			path: '/settings/admin-panel/profile',
			element: <ProfileUser />,
		},
		{
			path: '/settings/admin-panel/profile/wallet',
			element: <BalanceAndTransactionAdmin />,
		},
		{
			path: '/settings/admin-panel/profile/history-task',
			element: <HistoryTask />,
		},
		{
			path: '/settings/admin-panel/profile/give-role',
			element: <GiveRole />,
		},
		{
			path: '/settings/dev-panel',
			element: <DevPanel />,
		},

		{
			path: '/subject-form/:action',
			element: <SubjectForm />,
		},
		{
			path: '/list-task/:subjectID/filtering/teacher-form/:action',
			element: <TeacherForm />,
		},
		{
			path: '/list-task/:subjectID/task-form/:action',
			element: <TaskForm />,
		},
		{
			path: '/list-task/:subjectID/task-form/:action/choose-arguments/argument-form/:argumentAction',
			element: <ArgumentForm />,
		},

		{
			path: '/list-task/:subjectID/task-form/:action/choose-developer',
			element: <ChooseDeveloper />,
		},
		{
			path: '/list-task/:subjectID/task-form/:action/choose-arguments',
			element: <ChooseArgument />,
		},

		{
			path: '/list-task/:subjectID/task-form/:action/choose-file',
			element: <ChooseFile />,
		},
		{
			path: '/list-task/:subjectID/task-form/:action/choose-file/add-file',
			element: <AddFile />,
		},
	]
}
