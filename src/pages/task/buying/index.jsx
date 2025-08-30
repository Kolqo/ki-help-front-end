import './styles.css'

import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useGoBack } from '../../../shared/hooks'
import { BuyHeader, ErrorMessage, FixedButton } from '../../../shared/ui'
import { Description, TaskInputs } from './ui'

import { useAddTaskProcess } from '../../../features/task/model'

export default function Buying() {
	const { subjectID } = useParams()
	useGoBack(`/list-task/${subjectID}`)

	const [isActive, setIsActive] = useState(false)
	const [args, setArgs] = useState([])

  const task = JSON.parse(localStorage.getItem('buyingTask'))

	const [fields, setFields] = useState(() => {
		if (task.type === 'REGULAR' && task?.arguments) {
			return task.arguments.map(arg => ({
				section: { header: arg.name },
				placeholder: !!arg.description ? arg.description : 'Введіть дані',
			}))
		} else {
			return [
				{
					section: { header: 'ПИТАННЯ №1' },
					placeholder: 'Напишіть питання',
				},
			]
		}
	})

	const addTaskProcessState = useAddTaskProcess()

	const handleOnChange = inputValues => {
		setIsActive(
			Object.values(inputValues).every(val => {
				return val != null && String(val).trim() !== '' && val !== 0
			})
		)
	}

	return (
		<>
			<div className='container-buying'>
				<ErrorMessage errors={[addTaskProcessState.error]} />
				<BuyHeader
					text={{ header: task.title, footer: task.teacher.subject.name }}
				/>
				<Description task={task} />
				<TaskInputs
					task={task}
					setArgs={setArgs}
					handleOnChange={handleOnChange}
					fields={fields}
					setFields={setFields}
				/>
				<FixedButton
					text={{
						default: `Відправити ${
							task.type === 'REGULAR' ? task.price : task.price * fields.length
						} UAH`,
						loading: 'Виконується запит',
					}}
					isDisabled={addTaskProcessState.isLoading}
					isActive={isActive}
					onClick={() =>
						addTaskProcessState.handlePost(subjectID, task.id, args)
					}
				/>
			</div>
		</>
	)
}
