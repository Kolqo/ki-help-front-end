import { useNavigate } from 'react-router-dom'

import {
	Avatar,
	BottomSheet,
	BottomSheetHeader,
	Button,
	ButtonTemplate,
	CategoriesWrapper,
	FixedButton,
	Table,
	UsernameWrapper,
} from '../../../../../shared/ui'

import { ExplanationIcon } from '../../../../../shared/assets/svg'

export default function BottomSheetHistory(props) {
	const navigate = useNavigate()
  console.log(props.history)
	const isExplanation = !!props.history?.explanationSessionId
  const allowedReprocess = !!props.history?.allowedReprocess

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
				{isExplanation && (
					<CategoriesWrapper>
						<ButtonTemplate
							leftData={<ExplanationIcon />}
							centerData={{
								header: 'Пояснення',
								footer:
									'Відкрити чат в реальному часі з ботом, в якому ви можете задати питання відносно завдання',
							}}
							onClick={() =>
								navigate(`/chat-ai/${props.history?.explanationSessionId}`)
							}
						/>
					</CategoriesWrapper>
				)}
				<FixedButton
					text={{
						default: `${allowedReprocess ? 'Перегенерувати' : 'Зрозуміло'}`,
						loading: 'Виконується запит',
					}}
					isShimmer={allowedReprocess}
					isDisabled={props.putHistoryReprocess.isLoading}
					isActive={true}
					onClick={() => {
						if (allowedReprocess)
							props.putHistoryReprocess.handlePatch(props.history.id)
						else props.bottomSheetState.closeSheet()
					}}
				/>
			</BottomSheet>
		</>
	)
}
