const filterHistoryPopupItems = (onClick, refetch) => [
	{
		text: 'УСІ',
		onClick: () => {
			onClick({ name: 'УСІ', type: 'ALL' }), refetch()
		},
	},
	{
		text: 'З АВТОГЕНЕРАЦІЄЮ',
		onClick: () => {
			onClick({ name: 'З АВТОГЕНЕРАЦІЄЮ', type: 'AUTOGENERATE' }), refetch()
		},
	},
	{
		text: 'БЕЗ АВТОГЕНЕРАЦІЇ',
		onClick: () => {
			onClick({ name: 'БЕЗ АВТОГЕНЕРАЦІЇ', type: 'REGULAR' }), refetch()
		},
	},
]

export default filterHistoryPopupItems
