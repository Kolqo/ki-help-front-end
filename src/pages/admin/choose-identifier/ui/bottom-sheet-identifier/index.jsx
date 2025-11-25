import { useNavigate, useParams } from 'react-router-dom'

import {
	BottomSheet,
	BottomSheetHeader,
	Button,
	FixedButton,
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
						disabled={false || !false}
						leftIcon={false && <Loading className='buying-task-spinner' />}
					>
						{false ? 'Виконується запит' : 'Вибрати'}
					</Button>
					<Button
						className={`gray-button fixed-button ${!false ? 'non-active' : ''} ${
							false ? 'button-shimmer' : ''
						}`}
						onClick={() => console.log('click')}
						disabled={false || !false}
						leftIcon={false && <Loading className='buying-task-spinner' />}
					>
						{false ? 'Виконується запит' : 'Оновити'}
					</Button>
				</div>
			</BottomSheet>
		</>
	)
}
