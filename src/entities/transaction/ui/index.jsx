import './styles.css'

import { Avatar, ListTemplate, TimeFormatter } from '../../../shared/ui'
import { ProfileIcon, PaymentsIcon } from '../assets'

export default function Transaction(props) {
	const { item, isDevMode, customType, onClick } = props

	const leftData = item?.source?.user?.photo ? (
		<Avatar photo={item.source.user.photo} diameter={31} />
	) : (
		<PaymentsIcon />
	)

	const txMeta = getTxMeta({
		mode: isDevMode,
		type: customType ?? item.type,
		status: item.status,
		amount: item.amount,
		createdAt: item.createdAt,
    source: item.source,
		leftData,
	})

	const RightData = () => (
		<div className='transaction-right-data'>
			<p className={`amount ${txMeta.style}`}>{txMeta.rightData.header}</p>
			<p className='time'>{txMeta.rightData.footer}</p>
		</div>
	)

	return (
		<ListTemplate
			leftData={txMeta.leftData}
			centerData={txMeta.centerData}
			rightData={<RightData />}
			onClick={onClick}
		/>
	)
}

function getTxMeta({
	mode,
	type,
	status,
	amount,
	createdAt,
	leftData,
	source,
}) {
	const baseTime = <TimeFormatter utcDateString={createdAt} />

	const configs = {
		default: {
			DEPOSIT: {
				style: 'deposit',
				centerData: {
					header: 'Поповнення Stars',
					footer: baseTime,
				},
				rightData: {
					header: `+${amount} STARS`,
					footer: 'Отримано',
				},
			},
			TRANSFER: {
				style: 'withdraw',
				centerData: {
					header: 'Купівля завдання',
					footer: baseTime,
				},
				rightData: {
					header: `-${amount} STARS`,
					footer: 'Надіслано',
				},
			},
			WITHDRAW: {
				PROCESSING: {
					style: 'withdraw',
					centerData: {
						header: 'Виплата коштів',
						footer: baseTime,
					},
					rightData: {
						header: `-${amount} STARS`,
						footer: 'Надіслано',
					},
				},
			},
		},

		dev: {
			TRANSFER: {
				SUCCESS: {
					style: 'deposit',
					centerData: {
						header: 'Купівля завдання',
						footer: baseTime,
					},
					rightData: {
						header: `+${amount} STARS`,
						footer: 'Отримано',
					},
				},
				PROCESSING: {
					style: 'transfer',
					centerData: {
						header: 'Купівля завдання',
						footer: baseTime,
					},
					rightData: {
						header: `${amount} STARS`,
						footer: 'Очікується',
					},
				},
			},
			WITHDRAW: {
				DEFAULT: {
					style: 'withdraw',
					centerData: {
						header: 'Виплата коштів',
						footer: baseTime,
					},
					rightData: {
						header: `-${amount} STARS`,
						footer: 'Надіслано',
					},
				},
				PROCESSING: {
					centerData: {
						header: source.user.username,
						footer: baseTime,
					},
					rightData: {
						header: `${amount} STARS`,
						footer: 'Обробка',
					},
				},
			},
		},
	}

	const modeConfig = configs[mode] ?? {}
	console.log(modeConfig)
	const typeConfig = modeConfig[type]
	console.log(type)

	let meta

	if (!typeConfig) {
		meta = null
	} else if (typeConfig.centerData) {
		meta = typeConfig
	} else {
		meta = typeConfig[status] ?? typeConfig.DEFAULT ?? null
	}

	const unknownTx = {
		leftData: <ProfileIcon />,
		style: '',
		centerData: {
			header: 'Невідома транзакція',
			footer: baseTime,
		},
		rightData: {
			header: `${amount} STARS`,
			footer: status ?? 'Невідомо',
		},
	}

	return {
		leftData,
		...(meta ?? unknownTx),
	}
}
