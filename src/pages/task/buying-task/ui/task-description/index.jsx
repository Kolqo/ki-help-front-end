import './styles.css'

import { useToggle } from '../../../../../shared/hooks'

export default function TaskDescription(props) {
	const { state, toggle } = useToggle(props.task.description.length < 90)
	const isLongDescription =
		props.task.description.length < 90 ? 'non-expand' : ''

	return (
		<>
			<div className='style-task-description '>
				<div className='task-description'>
					<span>Інструкція від @{props.task.developer.username}</span>
					<p>
						{state
							? props.task.description
							: `${props.task.description.slice(0, 90)}...`}
					</p>
				</div>
				<div className={`task-expand ${isLongDescription}`}>
					<span onClick={toggle}>{state ? 'згорнути' : 'розгорнути'}</span>
				</div>
			</div>
		</>
	)
}
