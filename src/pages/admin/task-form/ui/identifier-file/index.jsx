import { useNavigate, useParams } from 'react-router-dom'

import {
	Adder,
	CategoriesWrapper,
	FileItem,
	SectionWrapper,
} from '../../../../../shared/ui'

export default function IdentifierFile(props) {
	const { subjectID, action } = useParams()
	const navigate = useNavigate()

	if (!props.data.identifier) {
		return (
			<SectionWrapper
				section={{
					header: 'ІДЕНТИФІКАТОР',
				}}
			>
				<CategoriesWrapper>
					<Adder
						centerText='Додати ідентифікатор'
						isVisible={true}
						onClick={() =>
							navigate(
								`/list-task/${subjectID}/task-form/${action}/choose-identifier`
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
					header: 'ІДЕНТИФІКАТОР',
				}}
			>
				<CategoriesWrapper>
					<FileItem
						centerData={{
							header: props.data.identifier.name,
							footer: props.data.identifier.type,
						}}
						onClick={props.onClick}
						isCrossVisible
					/>
				</CategoriesWrapper>
			</SectionWrapper>
		</>
	)
}
