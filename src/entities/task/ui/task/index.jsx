import './styles.css'

import {
	Avatar,
	Button,
	TimeFormatter,
	UsernameWrapper,
} from '../../../../shared/ui'

import { useRoles } from '../../../../shared/hooks'

import { AiIcon, VisibleIcon, DocumentIcon, InvisibleIcon } from '../../assets'

const { isAdmin } = useRoles()

const InfoTask = props => {
	const isDiscount = props.task.discount > 0
	const priceWithDiscount =
		props.task.price - props.task.price * (props.task.discount / 100)

	return (
		<>
			<p className='task-title'>{props.task.title}</p>
			<p className='task-price'>
				Вартість{' '}
				{isDiscount ? <s>{props.task.price} UAH</s> : `${props.task.price} UAH`}{' '}
				{isDiscount && `/ ${priceWithDiscount} UAH`}
			</p>
		</>
	)
}

const ButtonTask = props => {
	return (
		<>
			<Button
				className='task-button blue-button no-select'
				onClick={props.onClick}
			>
				ПРИДБАТИ
			</Button>
		</>
	)
}

const LeftFooterTask = props => {
	return (
		<>
			<div className='task-developer-info'>
				Створено:
				<Avatar photo={props.task.developer.photo} diameter={20} />
				<UsernameWrapper>{props.task.developer.username}</UsernameWrapper>
			</div>
		</>
	)
}

const RightFooterTask = props => {
	return (
		<>
			<div className='task-icons'>
				{isAdmin() &&
					(props.task.visible ? <VisibleIcon /> : <InvisibleIcon />)}
				{props.task.autoGenerate && <AiIcon />}
				{props.task.document && <DocumentIcon />}
			</div>
		</>
	)
}

export default function Task(props) {
	const isDiscount = props.task.discount > 0

	return (
		<div
			className={`style-task no-select ${isDiscount && 'task-discount-style'}`}
			{...props.bindTarget(props.task)}
		>
			<div className='task-header'>
				<div className='task-info'>
					<InfoTask task={props.task} />
				</div>
				<div className='task-button-box'>
					<ButtonTask onClick={props.onClick} />
				</div>
			</div>
			<div className='task-footer'>
				<LeftFooterTask task={props.task} />
				<RightFooterTask task={props.task} />
			</div>
		</div>
	)
}
