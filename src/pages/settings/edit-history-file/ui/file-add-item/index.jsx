import { CategoriesWrapper, FileItem, SectionWrapper } from '../../../../../shared/ui'

export default function FileAddItem(props) {
	return (
		<>
			<SectionWrapper section={{ header: 'ФАЙЛ ДЛЯ ПОЯСНЕННЯ' }}>
				<CategoriesWrapper>
					<FileItem
						centerData={{
							header:
								props.file?.name.length > 30
									? props.file?.name.slice(0, 20) + '...'
									: props.file?.name,
						}}
						onClick={() => props.setFile({file: null})}
						isCrossVisible
					/>
				</CategoriesWrapper>
			</SectionWrapper>
		</>
	)
}
