import './styles.css'

import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { SwitchItem, ExplanationFile, IdentifierFile } from './ui'
import {
	AdminHeader,
	ErrorMessage,
	GroupInput,
	FixedButton,
	ActionPopup,
	OptionRow,
} from '../../../shared/ui'

import { TwoArrowIcon, ArrowIcon } from '../../../shared/assets/svg'

import { useAddTask, useEditTask } from '../../../features/task/model'
import { useTaskData } from '../../../features/task/hooks'
import { useGoBack, useInputGroup, useShowPopup } from '../../../shared/hooks'

import { generateTypePopupItems } from '../../../shared/lib'

import { taskFormFields } from './const'

export default function TaskForm() {
	const { subjectID, action } = useParams()
	useGoBack(`/list-task/${subjectID}`)
	const navigate = useNavigate()

	const inputRefs = useRef([])

	const { handleKeyDown, getAllValues, setAllValues } = useInputGroup(
		inputRefs,
		taskFormFields.length
	)

	const taskDataState = useTaskData(action, setAllValues)
	const showPopupState = useShowPopup()
	const addTaskState = useAddTask()
	const editTaskState = useEditTask()

	const args = (() => {
		const args = taskDataState.data.arguments
		if (!Array.isArray(args) || args.length === 0) return ''
		if (args.length === 1) return args[0].name
		return `${args.length}...`
	})()

	const handleAutoGenerate = () => {
		const data = taskDataState.data
		taskDataState.updateData({
			autoGenerate: data.type === 'TEST' ? true : !data.autoGenerate,
			identifier: null,
		})
	}

  const handleVisible = () => {
    const data = taskDataState.data
		taskDataState.updateData({
			visible: !data.visible
		})
  }

	return (
		<>
			<div className='container-add-subject'>
				<ErrorMessage
					errors={[addTaskState.error, editTaskState.error]}
				></ErrorMessage>
				{showPopupState.position && (
					<ActionPopup
						ref={showPopupState.menuRef}
						items={generateTypePopupItems(taskDataState.updateData)}
						onClick={showPopupState.close}
						position={showPopupState.position}
					/>
				)}
				<AdminHeader text={{ header: 'Додати завдання' }} />
				<GroupInput
					fields={taskFormFields(taskDataState.data.price)}
					inputRefs={inputRefs}
					onKeyDown={handleKeyDown}
					onChange={() => taskDataState.handleOnChange(getAllValues())}
				/>
				<OptionRow
					header='Тип'
					option={taskDataState.data.type}
					rightIcon={<TwoArrowIcon />}
					onClick={showPopupState.handleLeftClick}
				/>
				<OptionRow
					header='Розробник'
					option={taskDataState.data.developer?.username}
					rightIcon={<ArrowIcon fill='#999999' />}
					onClick={() =>
						navigate(
							`/list-task/${subjectID}/task-form/${action}/choose-developer`
						)
					}
				/>
				<OptionRow
					header='Аргументи'
					option={args}
					rightIcon={<ArrowIcon fill='#999999' />}
					onClick={() =>
						navigate(
							`/list-task/${subjectID}/task-form/${action}/choose-arguments`
						)
					}
				/>
				<IdentifierFile
					data={taskDataState.data}
					onCrossClick={() => taskDataState.updateData({ identifier: null })}
				/>
				<ExplanationFile
					data={taskDataState.data}
					onCrossClick={() => taskDataState.updateData({ document: null })}
				/>
				<SwitchItem
					section={{
						footer:
							'Включивши автогенерацію, користувач буде отримувати завдання зразу після купівлі.',
					}}
					centerData={{ header: 'Авто генерація' }}
					isSwitch={taskDataState.data.autoGenerate}
					setIsSwitch={handleAutoGenerate}
				/>
				{action === 'edit' && (
					<SwitchItem
						centerData={{ header: 'Видимість' }}
						isSwitch={taskDataState.data.visible}
						setIsSwitch={handleVisible}
					/>
				)}
				<FixedButton
					text={{ default: 'Зберегти', loading: 'Виконується запит' }}
					isDisabled={addTaskState.isLoading || editTaskState.isLoading}
					isActive={taskDataState.isActive}
					onClick={() => {
						if (action === 'add')
							addTaskState.handlePost(taskDataState.data, subjectID)
						else editTaskState.handlePut(taskDataState.data, subjectID)
					}}
				/>
			</div>
		</>
	)
}
