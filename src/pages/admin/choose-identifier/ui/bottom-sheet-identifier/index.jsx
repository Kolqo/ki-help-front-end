import { useNavigate, useParams } from 'react-router-dom'

import {
	BottomSheet,
	BottomSheetHeader,
	Button,
	Loading,
	Table,
} from '../../../../../shared/ui'

export default function BottomSheetIdentifier(props) {
	const { subjectID, action } = useParams()
	const navigate = useNavigate()

	const tableData = {
		Назва: props.identifier?.name,
		Тип: props.identifier?.type,
		Опис: props.identifier?.description
			? props.identifier?.description
			: 'Пусто',
	}

	return (
		<>
			<BottomSheet bottomSheetState={props.bottomSheetState}>
				<BottomSheetHeader
					text={{
						header: 'Інформація про файл',
						footer: 'Дізнатися більше інформаці про файл',
					}}
				/>
				<Table data={tableData} />
				<div className='style-fixed-button'>
					<Button
						className={`blue-button fixed-button ${!true ? 'non-active' : ''} ${
							false ? 'button-shimmer' : ''
						}`}
						onClick={() => {
							props.taskDataState.updateData({ identifier: props.identifier })
							navigate(`/list-task/${subjectID}/task-form/${action}`)
						}}
						leftIcon={false && <Loading className='buying-task-spinner' />}
					>
						{false ? 'Виконується запит' : 'Вибрати'}
					</Button>
					<Button
						className={`light-blue-button fixed-button ${
							false ? 'button-shimmer' : ''
						}`}
						onClick={async () => {
							await props.putIdentifierState.handlePut(props.identifier.id)
              if (!props.putIdentifierState.error.isError) props.bottomSheetState.closeSheet()
						}}
						disabled={props.putIdentifierState.isLoading}
						leftIcon={
							props.putIdentifierState.isLoading && (
								<Loading className='buying-task-spinner' />
							)
						}
					>
						{props.putIdentifierState.isLoading ? 'Завантаження' : 'Оновити'}
					</Button>
				</div>
			</BottomSheet>
		</>
	)
}
