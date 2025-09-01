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
  const infoUser = props.taskStatus ? props.item.user : props.item.task.developer
	return (
		<>
			<div className='task-developer-info'>
				{props.taskStatus ? 'Купив: ' : 'Створено: '}
				<Avatar photo={infoUser.photo} diameter={20} />
				<UsernameWrapper>{infoUser.username}</UsernameWrapper>
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

export default function HistoryTask(props) {
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
					{props.taskStatus === 'COMPLETED' && <ButtonTask item={props.item} />}
				</div>
			</div>
			<div className='task-footer'>
				<LeftFooterTask item={props.item} taskStatus={props.taskStatus} />
				<RightFooterTask item={props.item} />
			</div>
		</div>
	)
}
