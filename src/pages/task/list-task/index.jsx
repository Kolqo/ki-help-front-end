import './styles.css'

import { useParams, useNavigate } from 'react-router-dom'

import { Tasks, Filter } from './ui'
import { ErrorMessage, ScrollTopButton } from '../../../shared/ui'

import { useDeleteTask, useSelectedTasks } from '../../../features/task/model'
import { useGoBack, useShowPopup } from '../../../shared/hooks'
import { useDeleteHandler } from '../../../shared/lib'

export default function ListTask() {
	useGoBack(`/`)
	const { subjectID } = useParams()
	const navigate = useNavigate()
  localStorage.removeItem('choseTask')
	const teacher = JSON.parse(localStorage.getItem('choseTeacher'))

	const showPopupState = useShowPopup()
	const selectedTasksState = useSelectedTasks(teacher?.id)
	const deleteTaskState = useDeleteTask()
	const deleteTask = useDeleteHandler(
		deleteTaskState.handleDelete,
		selectedTasksState.refetch
	)

  localStorage.removeItem('taskCurrent')
	localStorage.removeItem('taskDraft')
  localStorage.removeItem('chooseIdentifier')

	return (
		<div className='container-list-task'>
			<ErrorMessage
				errors={[selectedTasksState.error, deleteTaskState.error]}
			/>
			<ScrollTopButton />
			<Filter
				onClick={() => navigate(`/list-task/${subjectID}/filtering`)}
				option={teacher?.name}
			/>
			<Tasks
				subjectID={subjectID}
				teacher={teacher}
				showPopupState={showPopupState}
				selectedTasksState={selectedTasksState}
				deleteTask={deleteTask}
			/>
		</div>
	)
}
