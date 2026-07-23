const itemHistoryPopupItems = (item, onCancelDirect, onNavigateCancelReason) => {
	if (item?.status === 'COMPLETED') {
		return [
			{
				text: 'Відмінити',
				onClick: () => {
					onNavigateCancelReason()
				},
			},
		]
	}

	return [
		{
			text: 'Відмінити',
			onClick: () => {
				onCancelDirect(item?.id)
			},
		},
	]
}

export default itemHistoryPopupItems
