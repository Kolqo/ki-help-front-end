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
						header:
							props.taskStatus === 'COMPLETED'
								? 'Немає історії завдань'
								: 'Не знайдено завдань для розробника',
						footer:
							props.taskStatus === 'COMPLETED'
								? 'Не знайдено історії завдань, перевірте пізніше'
								: 'Не знайдено завдань для розробника, перевірте пізніше',
					}}
					icon={SadSmileTgs}
				/>
			</>
		)
	}
	return (
		<>
			<SectionWrapper
				section={{
					header:
						props.taskStatus === 'COMPLETED'
							? 'ІСТОРІЯ ЗАВДАНЬ'
							: 'DEV ЗАВДАННЯ',
				}}
				actionHeader={
					props.taskStatus === 'COMPLETED' && (
						<div
							className='action-header'
							onClick={props.showPopupFilterState.handleLeftClick}
						>
							{props.mode.name}
							<TwoArrowIcon />
						</div>
					)
				}
			>
				{props.tasks.length != 0 ? (
					<div className='style-history-tasks'>
						{props.tasks.map(item => (
							<HistoryTask
								key={item.id}
								item={item}
								history={props.history}
								setHistory={props.setHistory}
								bottomSheetState={props.bottomSheetState}
								taskStatus={props.taskStatus}
								bindTarget={props.showPopupHistoryState.bindTarget}
							/>
						))}
						<div ref={props.state.sentinelRef} style={{ height: 1 }} />
					</div>
				) : (
					!props.state.isLoading && <EmptyHistoryList />
				)}
				{props.state.isLoading && <LoadingTask count={2} />}
			</SectionWrapper>
		</>
	)
}
