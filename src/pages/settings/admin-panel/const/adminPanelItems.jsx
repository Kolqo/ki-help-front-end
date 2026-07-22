import { useRoles } from '../../../../shared/hooks'

import {
	DiscountIcon,
	NotificationIcon,
	PaymentsIcon,
	RedProfileIcon,
	TechWorkIcon,
} from '../assets'

const adminPanelItems = isAdmin => [
	[
		{
			centerData: { header: 'Профілі користувачів' },
			leftData: <RedProfileIcon />,
			url: '/settings/admin-panel/profile',
			allowed: isAdmin,
		},
	],
	[
		{
			centerData: { header: 'Виплати' },
			leftData: <PaymentsIcon />,
			url: '/settings/admin-panel/request-payments',
			allowed: isAdmin,
		},
	],
	[
		{
			centerData: { header: 'Знижки' },
			leftData: <DiscountIcon />,
			url: '/settings/admin-panel/list-discount',
			allowed: isAdmin,
		},
	],
	[
		{
			centerData: { header: 'Сповіщення' },
			leftData: <NotificationIcon />,
			url: '/settings/admin-panel/notification',
			allowed: isAdmin,
		},
	],
	[
		{
			centerData: { header: 'Технічні роботи' },
			leftData: <TechWorkIcon />,
			url: '/settings/admin-panel/tech-work',
			allowed: isAdmin,
		},
	],
]

export default adminPanelItems
