import {
	AdminPanelIcon,
	DevPanelIcon,
	HelpIcon,
	HistoryTaskIcon,
} from '../assets'

const settingsPanelItems = (isAdmin, isDeveloper) => [
	[
		{
			centerData: { header: 'Історія завдань' },
			leftData: <HistoryTaskIcon />,
			url: '/settings/history',
			allowed: true,
		},
		{
			centerData: { header: 'Звернутися до підтримки' },
			leftData: <HelpIcon />,
			url: '/settings/support',
			allowed: true,
		},
	],
	[
		{
			centerData: { header: 'Admin панель' },
			leftData: <AdminPanelIcon />,
			url: '/settings/admin-panel',
			allowed: isAdmin,
		},
		{
			centerData: { header: 'Dev панель' },
			leftData: <DevPanelIcon />,
			url: '/settings/dev-panel',
			allowed: isDeveloper,
		},
	],
]

export default settingsPanelItems