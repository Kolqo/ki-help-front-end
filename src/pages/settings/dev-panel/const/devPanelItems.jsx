import { useRoles } from '../../../../shared/hooks'

import {
	DevTaskIcon,
	HistoryTaskIcon,
} from '../assets'

const { isAdmin, isDeveloper } = useRoles()

const devPanelItems = [
	[
		{
			centerData: { header: 'Dev завдання' },
			leftData: <DevTaskIcon />,
			url: '',
			allowed: isAdmin() || isDeveloper(),
		},
	],
	[
		{
			centerData: { header: 'Історія завдань' },
			leftData: <HistoryTaskIcon />,
			url: '',
			allowed: isAdmin() || isDeveloper(),
		},
	],
]

export default devPanelItems
