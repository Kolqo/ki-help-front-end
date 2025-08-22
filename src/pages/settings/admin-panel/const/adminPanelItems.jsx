import { useRoles } from '../../../../shared/hooks'

import {
	DiscountIcon,
	NotificationIcon,
	PaymentsIcon,
	RedProfileIcon,
} from '../assets'

const { isAdmin } = useRoles()

const adminPanelItems = [
	[
		{
			centerData: { header: 'Профілі користувачів' },
			leftData: <RedProfileIcon />,
			url: '',
			allowed: isAdmin(),
		},
	],
	[
		{
			centerData: { header: 'Виплати' },
			leftData: <PaymentsIcon />,
			url: '',
			allowed: isAdmin(),
		},
	],
	[
		{
			centerData: { header: 'Знижки' },
			leftData: <DiscountIcon />,
			url: '',
			allowed: isAdmin(),
		},
	],
	[
		{
			centerData: { header: 'Сповіщення' },
			leftData: <NotificationIcon />,
			url: '',
			allowed: isAdmin(),
		},
	],
]

export default adminPanelItems
