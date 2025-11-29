const filterHistoryPopupItems = (onClick, refetch) => [
	{
		text: 'Редагувати',
		onClick: () => {
			onClick()
		},
	},
]

export default filterHistoryPopupItems
