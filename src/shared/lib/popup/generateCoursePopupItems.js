const generateCoursePopupItems = onClick => [
	{
		text: 1,
		onClick: () => onClick({ courseNumber: 1 }),
	},
	{
		text: 2,
		onClick: () => onClick({ courseNumber: 2 }),
	},
	{
		text: 3,
		onClick: () => onClick({ courseNumber: 3 }),
	},
	{
		text: 4,
		onClick: () => onClick({ courseNumber: 4 }),
	},
]

export default generateCoursePopupItems
