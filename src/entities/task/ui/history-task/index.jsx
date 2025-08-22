import './styles.css'

import {
	Avatar,
	Button,
	TimeFormatter,
	UsernameWrapper,
} from '../../../../shared/ui'
import { useDownload } from '../../../../shared/hooks'

const InfoTask = props => {
	return (
		<>
			<p className='task-title'>{props.item.task.title}</p>
			<p className='task-subject-name'>
				{props.item.task.teacher.subject.name}
			</p>
		</>
	)
}

const ButtonTask = props => {
  const { handleDownload } = useDownload()

	return (
		<>
			<Button
				className='task-button blue-button no-select'
				onClick={(e) => (e.stopPropagation(), handleDownload(props.item.link, props.item.fileName))}
			>
				СКАЧАТИ
			</Button>
		</>
	)
}

const LeftFooterTask = props => {
	return (
		<>
			<div className='task-developer-info'>
				Створено:
				<Avatar photo={props.item.task.developer.photo} diameter={20} />
				<UsernameWrapper>{props.item.task.developer.username}</UsernameWrapper>
			</div>
		</>
	)
}

const RightFooterTask = props => {
	return (
		<>
			<div className='task-time-created'>
				<TimeFormatter utcDateString={props.item.createdAt} />
			</div>
		</>
	)
}

export default function Task(props) {
	return (
		<div
			className={`style-history-task no-select ${
				props.item.id === props.history?.id && `chose-history`
			}`}
			onClick={() => (
				props.setHistory(props.item), props.bottomSheetState.openSheet()
			)}
		>
			<div className='task-header'>
				<div className='task-info'>
					<InfoTask item={props.item} />
				</div>
				<div className='task-button-box'>
					<ButtonTask item={props.item} />
				</div>
			</div>
			<div className='task-footer'>
				<LeftFooterTask item={props.item} />
				<RightFooterTask item={props.item} />
			</div>
		</div>
	)
}
