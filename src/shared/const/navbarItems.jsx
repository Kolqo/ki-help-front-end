import { SettingsIcon, TaskIcon, WalletIcon } from '../assets/svg'

const items = [
	{ id: 'task', label: 'Завдання', icon: <TaskIcon />, url: '/' },
	{ id: 'wallet', label: 'Гаманець', icon: <WalletIcon />, url: '/wallet' },
	{
		id: 'settings',
		label: 'Налаштування',
		icon: <SettingsIcon />,
		url: '/settings',
	},
]

export default items
