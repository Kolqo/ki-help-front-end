const discountFormFields = isLimit => [
	{
		section: { header: 'ЗНИЖКА' },
		placeholder: 'Формат: 100 %',
	},
	...(isLimit
		? [
				{
					section: { header: 'ЛІМІТ АКТИВАЦІЙ' },
					placeholder: 'Введіть ліміт',
				},
		  ]
		: []),
]

export default discountFormFields