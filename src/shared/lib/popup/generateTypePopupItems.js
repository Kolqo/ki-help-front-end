const generateTypePopupItems = updateTaskData => [
	{
		text: 'REGULAR',
		onClick: () => {
			updateTaskData({ type: 'REGULAR' })
		},
	},
	{
		text: 'TEST',
		onClick: () => {
			updateTaskData({ type: 'TEST', autoGenerate: true, document: null})
		},
	},
]

export default generateTypePopupItems
