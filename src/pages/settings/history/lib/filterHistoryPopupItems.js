const filterHistoryPopupItems = onClick => [
	{
		text: 'З АВТОГЕНЕРАЦІЄЮ',
		onClick: () => onClick({ name: 'З АВТОГЕНЕРАЦІЄЮ', autoGenerate: true }),
	},
	{
		text: 'БЕЗ АВТОГЕНЕРАЦІЇ',
		onClick: () => onClick({ name: 'БЕЗ АВТОГЕНЕРАЦІЇ', autoGenerate: false }),
	},
]

export default filterHistoryPopupItems

