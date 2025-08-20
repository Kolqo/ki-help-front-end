import { AdminPanelIcon, DevPanelIcon, HelpIcon, HistoryTaskIcon} from "../assets"

const listSettings = [
	[
		{
			centerData: { header: 'Історія завдань' },
			leftData: <HistoryTaskIcon />,
			url: '',
			allowed: null,
		},
		{
			centerData: { header: 'Звернутися до підтримки' },
			leftData: <HelpIcon />,
			url: '',
			allowed: null,
		},
	],
	[
		{
			centerData: { header: 'Admin панель' },
			leftData: <AdminPanelIcon />,
			url: '',
			allowed: ['ADMIN'],
		},
		{
			centerData: { header: 'Dev панель' },
			leftData: <DevPanelIcon />,
			url: '',
			allowed: ['ADMIN', 'DEVELOPER'],
		},
	],
]

export default listSettings