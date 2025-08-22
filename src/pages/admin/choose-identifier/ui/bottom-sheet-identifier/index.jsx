import { useNavigate, useParams } from 'react-router-dom'

import {
	BottomSheet,
	BottomSheetHeader,
	FixedButton,
	Table,
} from '../../../../../shared/ui'

export default function BottomSheetIdentifier(props) {
	const { subjectID, action } = useParams()
	const navigate = useNavigate()

	const tableData = {
		Назва: props.identifier?.name,
		Тип: props.identifier?.type,
		Опис: props.identifier?.description ? props.identifier?.description : 'Пусто',
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
				<FixedButton
					text={{ default: 'Додати', loading: 'Виконується запит' }}
					isActive={true}
					onClick={() => {
						props.taskDataState.updateData({ identifier: props.identifier })
						navigate(`/list-task/${subjectID}/task-form/${action}`)
					}}
				/>
			</BottomSheet>
		</>
	)
}
