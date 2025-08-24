import './styles.css'

import { HistoryTask, LoadingTask } from '../../../../../entities'
import { EmptyList, SectionWrapper } from '../../../../../shared/ui'

import { TwoArrowIcon } from '../../../../../shared/assets/svg'
import { SadSmileTgs } from '../../../../../shared/assets/tgs'

export default function HistoryTasks(props) {
	const EmptyHistoryList = () => {
		return (
			<>
				<EmptyList
					text={{
						header: 'Немає історії завдань',
						footer: 'Не знайдено історії завдань, перевірте пізніше',
					}}
					icon={SadSmileTgs}
				/>
			</>
		)
	}
	return (
		<>
			<SectionWrapper
				section={{ header: props.taskStatus === 'COMPLETED' ? 'ІСТОРІЯ ЗАВДАНЬ' : 'DEV ЗАВДАННЯ' }}
				actionHeader={props.taskStatus === 'COMPLETED' &&
					<div
						className='action-header'
						onClick={props.showPopupState.handleLeftClick}
					>
						{props.mode.name}
						<TwoArrowIcon />
					</div>
				}
			>
				{props.getTaskInProgressState.tasks.length != 0 ? (
					<div className='style-history-tasks'>
						{props.getTaskInProgressState.tasks.map(item => (
							<HistoryTask
								key={item.id}
								item={item}
								history={props.history}
								setHistory={props.setHistory}
								bottomSheetState={props.bottomSheetState}
								taskStatus={props.taskStatus}
							/>
						))}
					</div>
				) : (
					<EmptyHistoryList/>
				)}
				{props.isLoading && <LoadingTask count={2} />}
			</SectionWrapper>
		</>
	)
}
