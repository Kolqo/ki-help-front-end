import { useRoles } from '../../../../shared/hooks'

import {
	DevTaskIcon,
	HistoryTaskIcon,
} from '../assets'

const devPanelItems = (isDeveloper) => [
	[
		{
			centerData: { header: 'Dev завдання' },
			leftData: <DevTaskIcon />,
			url: '/settings/dev-panel/history/INPROGRESS',
			allowed: isDeveloper,
		},
	],
	[
		{
			centerData: { header: 'Історія завдань' },
			leftData: <HistoryTaskIcon />,
			url: '/settings/dev-panel/history/COMPLETED',
			allowed: isDeveloper,
		},
	],
]

export default devPanelItems
