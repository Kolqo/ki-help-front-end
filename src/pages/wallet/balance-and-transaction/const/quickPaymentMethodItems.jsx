import {
	CardIcon,
	StarsIcon,
	CryptoIcon,
} from '../assets/payment-method-icon'

const quickPaymentMethodItems = [
	{
		text: 'Банківська картка',
    provider: 'MONOBANK',
    isDisabled: false,
		icon: <CardIcon />,
	},
	{
		text: 'Зірки',
    provider: 'TELEGRAM_STARS',
    isDisabled: false,
		icon: <StarsIcon />,
	},
	{
		text: 'Криптовалюта',
    provider: 'CRYPTO',
    isDisabled: true,
		icon: <CryptoIcon />,
	},
]

export default quickPaymentMethodItems
