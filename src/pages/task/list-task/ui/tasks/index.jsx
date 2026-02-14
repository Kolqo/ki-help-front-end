import './styles.css'

import { useNavigate } from 'react-router-dom'

import { LoadingTask, Task } from '../../../../../entities'

import { EntityPopup } from '../../../../../features/entity/ui'
import { EmptyList, FixedAdder } from '../../../../../shared/ui'
import { TaskAdder } from '../'

import { useRoles } from '../../../../../shared/hooks'
import { filterTasks } from '../../../../../entities/task/lib'

import SadSmile from '../../assets/tgs/sad-smile.tgs'

export default function Tasks(props) {
	const navigate = useNavigate()

	const { isAdmin } = useRoles()

	const filteredTasks = filterTasks(
		props.selectedTasksState.selectedTasks,
		isAdmin()
	)

	const isAnyTask = filteredTasks.length > 0

	if (!isAnyTask && !props.selectedTasksState.isLoading) {
		return (
			<>
				<TaskAdder teacher={props.teacher} subjectID={props.subjectID} />
				<EmptyList
					text={{
						header: 'Немає завдань',
						footer: 'Виберіть викладача або перевірте пізніше',
					}}
					icon={SadSmile}
				/>
			</>
		)
	}
	return (
		<>
			<EntityPopup
				deleteSubject={props.deleteTask}
				showPopupState={props.showPopupState}
				editLink={`/list-task/${props.subjectID}/task-form/edit`}
				localStorageName={'taskCurrent'}
			/>
			{filteredTasks.length != 0 && (
				<div className='style-tasks'>
					<TaskAdder teacher={props.teacher} subjectID={props.subjectID} />
					{filteredTasks.map(item => (
						<Task
							key={item.id}
							task={item}
							onClick={() => {
								;(navigate(`/list-task/${props.subjectID}/buying`),
									localStorage.setItem('buyingTask', JSON.stringify(item)))
							}}
							bindTarget={props.showPopupState.bindTarget}
						/>
					))}
				</div>
			)}
			<div>
				<div ref={props.selectedTasksState.sentinelRef} style={{ height: 0 }} />
				{props.selectedTasksState.isLoading && <LoadingTask count='2' showButton showIcons />}
			</div>
		</>
	)
}
