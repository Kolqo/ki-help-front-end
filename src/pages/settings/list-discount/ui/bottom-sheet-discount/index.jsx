import {
  Avatar,
	BottomSheet,
	BottomSheetHeader,
	FixedButton,
	Table,
  UsernameWrapper,
} from '../../../../../shared/ui'

export default function BottomSheetDiscount(props) {
	console.log(props.discount)
	const discountData = {
		Назва: props.discount?.task.title,
		Предмет: props.discount?.task.teacher.subject.name,
		Викладач: props.discount?.task.teacher.name,
		Видано: !!props.discount?.user ? (
			<div className='user-avatar'>
				<Avatar diameter='20' photo={props.discount?.user.photo} />
				<UsernameWrapper>
					{props.discount?.user.username}
				</UsernameWrapper>
			</div>
		) : (
			'Всім'
		),
		Знижка: `${props.discount?.value} %`,
		'Кількість активацій': !!props.discount?.activationLimits
			? props.discount?.activationLimits
			: '∞',
		'Активно з': !!props.discount?.validFrom ? props.discount?.validFrom : '∞',
		'Активно до': !!props.discount?.validTo ? props.discount?.validTo : '∞',
	}

	return (
		<>
			<BottomSheet bottomSheetState={props.bottomSheetState}>
				<BottomSheetHeader
					text={{
						header: 'Інформація про знижку',
						footer: 'Дізнатися більше інформаці про знижку',
					}}
				/>
				<Table data={discountData} />
				<FixedButton
					text={{
						default: 'Зрозуміло',
						loading: 'Виконується запит',
					}}
					isActive={true}
					onClick={() => props.bottomSheetState.closeSheet()}
				/>
			</BottomSheet>
		</>
	)
}
