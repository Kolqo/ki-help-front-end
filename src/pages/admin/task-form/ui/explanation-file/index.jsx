import { useNavigate, useParams } from 'react-router-dom'

import {
	Adder,
	CategoriesWrapper,
	FileItem,
	SectionWrapper,
} from '../../../../../shared/ui'

export default function ExplanationFile(props) {
	const { subjectID, action } = useParams()
	const navigate = useNavigate()

	if (props.data.type == 'TEST') return

	if (!props.data.document) {
		return (
			<SectionWrapper
				section={{
					header: 'ФАЙЛ ДЛЯ ПОЯСНЕННЯ',
					footer:
						'Користувачі зможуть получати відповіді відповідно до цього файлу.',
				}}
			>
				<CategoriesWrapper>
					<Adder
						centerText='Додати файл'
						isVisible={true}
						onClick={() =>
							navigate(
								`/list-task/${subjectID}/task-form/${action}/choose-file`
							)
						}
					/>
				</CategoriesWrapper>
			</SectionWrapper>
		)
	}

	return (
		<>
			<SectionWrapper
				section={{
					header: 'ФАЙЛ ДЛЯ ПОЯСНЕННЯ',
					footer:
						'Користувачі зможуть получати відповіді відповідно до цього файлу.',
				}}
			>
				<CategoriesWrapper>
					<FileItem
						centerData={{
							header: props.data.document.fileName,
							footer: props.data.document.documentId,
						}}
						onCrossClick={props.onCrossClick}
						isCrossVisible
					/>
				</CategoriesWrapper>
			</SectionWrapper>
		</>
	)
}
