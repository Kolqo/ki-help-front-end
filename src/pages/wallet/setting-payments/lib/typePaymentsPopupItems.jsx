const typePaymentsPopupItems = onClick => [
	{
		text: 'Банківська картка',
		onClick: () => onClick('BANK_CARD'),
	},
	{
		text: 'Криптогаманець',
		onClick: () => onClick('CRYPTO'),
	},
]

export default typePaymentsPopupItems
