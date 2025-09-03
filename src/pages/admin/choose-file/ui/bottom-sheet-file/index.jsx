import { useNavigate, useParams } from 'react-router-dom'

import {
	Avatar,
	BottomSheet,
	BottomSheetHeader,
	CategoriesWrapper,
	FixedButton,
	SectionWrapper,
	Table,
	FileItem,
} from '../../../../../shared/ui'

import { useDownload } from '../../../../../shared/hooks'

export default function BottomSheetFile(props) {
	const { subjectID, action } = useParams()
  const navigate = useNavigate()
  const { handleDownload } = useDownload()

	const tableData = {
		ID: props.file?.documentId,
		Створено: (
			<div className='user-avatar'>
				<Avatar diameter='20' photo={props.file?.createdBy.photo} />
				{props.file?.createdBy.username}
			</div>
		),
		Опис: props.file?.description,
		Використовується: props.file?.tasks.map(({ title }) => title),
	}

  console.log(props.file)

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
				<SectionWrapper section={{ header: 'ФАЙЛ ДЛЯ ПОЯСНЕННЯ' }}>
					<CategoriesWrapper>
						<div
							onClick={() =>
								handleDownload(props.file.link, props.file.fileName)
							}
						>
							<FileItem centerData={{ header: props.file?.fileName }} />
						</div>
					</CategoriesWrapper>
				</SectionWrapper>
				<FixedButton
					text={{ default: 'Додати', loading: 'Виконується запит' }}
					isActive={true}
					onClick={() => {
						props.taskDataState.updateData({
							document: {
								documentId: props.file.documentId,
								fileName: props.file.fileName,
								createdAt: props.file.createdAt,
							},
						})
						navigate(`/list-task/${subjectID}/task-form/${action}`)
					}}
				/>
			</BottomSheet>
		</>
	)
}
