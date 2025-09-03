const filterHistoryPopupItems = (onClick, refetch) => [
	{
		text: 'З АВТОГЕНЕРАЦІЄЮ',
		onClick: () => {
			onClick({ name: 'З АВТОГЕНЕРАЦІЄЮ', autoGenerate: true }), refetch()
		},
	},
	{
		text: 'БЕЗ АВТОГЕНЕРАЦІЇ',
		onClick: () => {
			onClick({ name: 'БЕЗ АВТОГЕНЕРАЦІЇ', autoGenerate: false }), refetch()
		},
	},
]

export default filterHistoryPopupItems
