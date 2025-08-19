import './styles.css'

import { LoadingTaskDeveloper, ListTaskDeveloper } from './ui'
import { ErrorMessage, Tgs } from '../../../shared/ui'

import { useSelectedTasksDeveloper } from './model'
import { useGoBack } from '../../../shared/hooks'

import Moon from './assets/tgs/Moon.tgs'

export default function DevPanel() {
	useGoBack(`/settings`)
	const { error, errorMessage, isLoading, selectedTasksDeveloper, refetch } =
		useSelectedTasksDeveloper()
	const isAnyTasksDeveloper = selectedTasksDeveloper.length > 0
	return (
		<>
			<div className='container-dev-panel'>
				<ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
				{isLoading ? (
					<LoadingTaskDeveloper />
				) : isAnyTasksDeveloper ? (
					<ListTaskDeveloper
						selectedTasksDeveloper={selectedTasksDeveloper}
						refetch={refetch}
					/>
				) : (
					<div className='empty-list'>
						<Tgs src={Moon} isLoop isAutoplay></Tgs>
						<p>Немає замовлень</p>
						<div>
							Наразі замовлень немає. Щойно клієнт придбає завдання, воно
							з'явиться тут.
						</div>
					</div>
				)}
			</div>
		</>
	)
}
