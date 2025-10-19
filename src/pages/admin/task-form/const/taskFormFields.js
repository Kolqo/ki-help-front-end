const teacherFormFields = price => [
	{
		section: { header: 'НАЗВА' },
		placeholder: 'Напишіть назву',
	},
	{
		section: { header: 'ІНСТРУКЦІЯ' },
		placeholder: 'Напишіть інструкцію',
	},
	{
		section: {
			header: 'ЦІНА',
			footer: `Евавілентно ціні - ${+(price * 0.84).toFixed(3)} UAH`,
		},
		placeholder: 'Напишіть ціну',
	},
]

export default teacherFormFields