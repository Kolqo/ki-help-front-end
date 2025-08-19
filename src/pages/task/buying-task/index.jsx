import './styles.css'

import { useLocation, useParams } from 'react-router-dom'

import { Button, BuyHeader, Loading, ErrorMessage } from '../../../shared/ui'
import { InputBox, TaskDescription } from './ui'

import { useGoBack } from '../../../shared/hooks'

import useBuyingTask from './model/useBuyingTask.js'

export default function BuyingTask() {
	const location = useLocation()
	const { task } = location.state || {}
	const { subjectID, buying } = useParams()

	useGoBack(`/list-task/${subjectID}`)

	const { error, errorMessage, loading, handleFieldChange, handleValidation } =
		useBuyingTask(task.arguments)

	return (
		<>
			<div className='container-buying-task'>
				<ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
				<div className='buying-task'>
					<BuyHeader name={task.title}>{task.teacher.subject.name}</BuyHeader>
					{task.description.length > 0 && <TaskDescription task={task} />}
					<InputBox task={task} onChange={handleFieldChange} />
				</div>
				<Button
					className='blue-button fixed-button'
					disabled={loading}
					leftIcon={loading && <Loading className='buying-task-spinner' />}
					onClick={() => handleValidation(subjectID, buying, task)}
				>
					{loading ? 'Генерація' : 'Відправити'}
				</Button>
			</div>
		</>
	)
}
