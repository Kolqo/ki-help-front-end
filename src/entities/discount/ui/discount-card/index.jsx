import './styles.css'

import { Avatar, TimeFormatter, UsernameWrapper } from '../../../../shared/ui'

import { PeopleIcon } from '../../assets'

export default function DiscountCard(props) {
	const timeStr =
		props.item.validFrom && props.item.validTo ? (
			<>
				<TimeFormatter format='d MMMM' utcDateString={props.item.validFrom} /> -{' '}
				<TimeFormatter format='d MMMM' utcDateString={props.item.validTo} />
			</>
		) : (
			'∞'
		)

	return (
		<>
			<div className='style-discount-card' {...props.bindTarget(props.item)}>
				<div className='discount-card__header'>
					<p className='discount-card__title'>{props.item.task.title}</p>
					<div className='discount-card__info'>
						<div className='discount-card__users_and_value'>
							<div>
								1 <PeopleIcon />
							</div>
							{props.item.value}%
						</div>
						{!props.item.user && (
							<p className='discount-card__data'>{timeStr}</p>
						)}
					</div>
				</div>
				{props.item.user && (
					<div className='discount-card__footer'>
						<div className='discount-card__issued'>
							Видано: <Avatar photo={props.item.user.photo} diameter={20} />
							<UsernameWrapper>{props.item.user.username}</UsernameWrapper>
						</div>
						<div className='discount-card__data'>{timeStr}</div>
					</div>
				)}
			</div>
		</>
	)
}
