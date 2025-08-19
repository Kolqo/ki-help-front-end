import "./styles.css";

import { Avatar, Button, UsernameWrapper } from "../../../../shared/ui";

import { useRoles } from '../../../../shared/hooks'

import { AiIcon, VisibleIcon, InvisibleIcon } from "../../assets";

export default function Task(props) {
  const { isAdmin } = useRoles()

  const isDiscount = props.task.discount > 0;
  const priceWithDiscount =
    props.task.price - props.task.price * (props.task.discount / 100);
  return (
		<div
			className={`class-task no-select ${isDiscount && 'task-discount-style'}`}
			{...props.bindTarget(props.task)}
		>
			<div className='task-header'>
				<div className='task-info'>
					<p>{props.task.title}</p>
					<span>
						Вартість{' '}
						{isDiscount ? (
							<s>{props.task.price} UAH</s>
						) : (
							`${props.task.price} UAH`
						)}{' '}
						{isDiscount && `/ ${priceWithDiscount} UAH`}
					</span>
				</div>
				<Button
					className='task-button-buy blue-button no-select'
					onClick={props.onClick}
				>
					ПРИДБАТИ
				</Button>
			</div>
			<div className='task-footer'>
				<div className='footer-text'>
					Створено:
          <Avatar photo={props.task.developer.photo} diameter={20}/>
					<UsernameWrapper>{props.task.developer.username}</UsernameWrapper>
				</div>
				<div className='footer-icons'>
					{isAdmin() &&
						(props.task.visible ? <VisibleIcon /> : <InvisibleIcon />)}
					{props.task.autoGenerate && <AiIcon />}
				</div>
			</div>
		</div>
	)
}
