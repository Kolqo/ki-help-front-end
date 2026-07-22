const settingsPaymentsFields = paymentDetailsType => [
	{
		section: {
			header:
				paymentDetailsType === 'BANK_CARD'
					? 'НОМЕР КАРТКИ'
					: 'МОЯ КРИПТО АДРЕСА',
		},
		placeholder:
			paymentDetailsType === 'BANK_CARD' ? 'Номер картки' : 'Адреса USDT',
	},
]

export default settingsPaymentsFields
