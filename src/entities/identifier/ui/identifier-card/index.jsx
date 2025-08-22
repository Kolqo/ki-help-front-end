import './styles.css'

import { TimeFormatter } from '../../../../shared/ui'

export default function IdentifierCard(props) {
	return (
		<>
			<div
				className={`style-identifier-card no-select ${
					props.item.id === props.identifier?.id && `chose-identifier`
				}`}
				onClick={() => (
					props.setIdentifier(props.item), props.bottomSheetState.openSheet()
				)}
				{...props.bindTarget(props.item)}
			>
				<div className='identifier-card-header'>
					<p className='text-header'>{props.item.name}</p>
					<p className='text-footer'>{props.item.type}</p>
				</div>
				<div className='identifier-card-footer'>
					{props.item.createdAt ? (
						<TimeFormatter utcDateString={props.item.createdAt} />
					) : (
						'Дати не визначено'
					)}
				</div>
			</div>
		</>
	)
}
