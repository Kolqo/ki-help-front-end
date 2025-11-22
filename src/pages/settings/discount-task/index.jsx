import './styles.css'

import { useNavigate, useParams } from 'react-router-dom'

import {
	EmptyList,
	ErrorMessage,
	FixedButton,
	SectionWrapper,
} from '../../../shared/ui'

import { ChoiceItemList } from '../../../entities'

import { useGoBack } from '../../../shared/hooks'
import { useSelectedTasks } from '../../../features/task/model'
import { useCheckboxState } from '../../../entities/choice-item/model'

import { SadSmileTgs } from '../../../shared/assets/tgs'

export default function DiscountTask() {
	const { subjectId, teacherId } = useParams()
	useGoBack(`/settings/admin-panel/list-discount/path=/${subjectId}`)

	const navigate = useNavigate()

	const selectedTaskState = useSelectedTasks(teacherId, 1)

	const checkboxState = useCheckboxState(
		selectedTaskState.selectedTasks,
		null,
		false
	)

	const isActive = Object.values(checkboxState.checkedState).includes(true)

	const selectedTasks = Object.keys(checkboxState.checkedState)
		.filter(id => checkboxState.checkedState[id])
		.map(id => checkboxState.itemsMap[id])

	const EmptyTaskList = () => {
		return (
			<>
				<SectionWrapper section={{ header: 'ЗАВДАННЯ' }}>
					<EmptyList
						text={{
							header: 'Немає завдання',
							footer:
								'Не знайдено завдання, виберіть іншого викладача або перевірте пізніше',
						}}
						icon={SadSmileTgs}
					/>
				</SectionWrapper>
			</>
		)
	}

	return (
		<>
			<div className='container-discount-task'>
				<ErrorMessage errors={[selectedTaskState.error]} />
				{selectedTaskState.selectedTasks.length === 0 &&
				!selectedTaskState.isLoading ? (
					<EmptyTaskList />
				) : (
					<ChoiceItemList
						section={{ header: 'ЗАВДАННЯ' }}
						isChecked={checkboxState.checkedState}
						setIsChecked={checkboxState.changeCheckedState}
						objectList={selectedTaskState.selectedTasks}
						isLoading={selectedTaskState.isLoading}
						displayMode={'task'}
					/>
				)}
				<div ref={selectedTaskState.sentinelRef} style={{ height: 1 }} />
				<FixedButton
					text={{ default: 'Продовжити', loading: 'Виконується запит' }}
					isDisabled={false}
					isActive={isActive}
					onClick={() => {
						localStorage.setItem('choseTasks', JSON.stringify(selectedTasks))
						navigate(
							`/settings/admin-panel/list-discount/path=/${subjectId}/${teacherId}/discount-form/add`
						)
					}}
				/>
			</div>
		</>
	)
}
