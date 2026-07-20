const quickAmountButtonItems = currency => [
	{
		text: `100 ${currency}`,
		value: '100',
		type: 'quick-amount',
	},
	{
		text: `250 ${currency}`,
		value: '250',
		type: 'quick-amount',
	},
	{
		text: `500 ${currency}`,
		value: '500',
		type: 'quick-amount',
	},
	{
		text: `Інша сума`,
		value: '0',
		type: 'custom-amount',
	},
]

export default quickAmountButtonItems
