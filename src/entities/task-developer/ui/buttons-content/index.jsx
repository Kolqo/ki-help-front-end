import './styles.css'

import { Loading, TopIconButton } from '../../../../shared/ui'

import { CheckIcon } from '../../assets'

export default function ButtonsContent(props) {
	const onSendTask = async () => {
		try {
			await props.sendTask.handleSendTask(
				props.taskDeveloper.id,
				props.fileValue
			)
			props.refetch()
		} catch (error) {
			console.error('Помилка при відправці задачі:', error)
		}
	}

	return (
		<>
			<div className='style-buttons-content'>
				<TopIconButton
					className='gray-button button'
					onClick={() => onSendTask()}
					disabled={props.sendTask.isLoading}
					leftIcon={
						props.sendTask.isLoading ? (
							<Loading className='buying-task-spinner' />
						) : (
							<CheckIcon />
						)
					}
				>
					{props.sendTask.isLoading ? 'Відправляється' : 'Відправити'}
				</TopIconButton>
			</div>
		</>
	)
}
