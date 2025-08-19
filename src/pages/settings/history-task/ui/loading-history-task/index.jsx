import './styles.css'

export default function LoadingHistoryTask(props) {
	const tasksCount = 4
	const tasks = Array.from({ length: tasksCount }, (_, index) => (
		<div key={index} className='loading-history-tasks'>
			<div className='task-header'>
				<div className='task-header-left'>
					<div className='task-header-left-box1' />
					<div className='task-header-left-box2' />
				</div>
				<div className='task-header-right'>
					<div className='task-header-right-box' />
				</div>
			</div>
			<div className='task-bottom'>
				<div className='task-bottom-box1' />
				<div className='task-bottom-box2' />
			</div>
		</div>
	))

	return (
		<div className={`style-loading-history-task ${props.className || ''}`}>
			{tasks}
		</div>
	)
}
