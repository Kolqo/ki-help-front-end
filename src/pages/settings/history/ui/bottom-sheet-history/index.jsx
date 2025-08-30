import { useNavigate, useParams } from 'react-router-dom'

import {
	Avatar,
	BottomSheet,
	BottomSheetHeader,
	FixedButton,
	Table,
  UsernameWrapper,
} from '../../../../../shared/ui'

export default function BottomSheetHistory(props) {
	const navigate = useNavigate()

	const historyData = {
		Назва: props.history?.task.title,
		Предмет: props.history?.task.teacher.subject.name,
		Викладач: props.history?.task.teacher.name,
		Розробник: (
			<div className='user-avatar'>
				<Avatar diameter='20' photo={props.history?.task.developer.photo} />
				<UsernameWrapper>
					{props.history?.task.developer.username}
				</UsernameWrapper>
			</div>
		),
		Аргументи: props.history?.arguments,
	}
  console.log('history', props.history)
	return (
		<>
			<BottomSheet bottomSheetState={props.bottomSheetState}>
				<BottomSheetHeader
					text={{
						header: 'Інформація про завдання',
						footer: 'Дізнатися більше інформаці про завдання',
					}}
				/>
				<Table data={historyData} />
				<FixedButton
					text={{ default: 'Відкрити чат', loading: 'Виконується запит' }}
					isActive={props.history?.explanationSessionId}
					onClick={() =>
						navigate(`/chat-ai/${props.history?.explanationSessionId}`)
					}
				/>
			</BottomSheet>
		</>
	)
}
