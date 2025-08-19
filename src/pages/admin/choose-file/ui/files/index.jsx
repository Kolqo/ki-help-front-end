import './styles.css'

import { FileCard, FileCardLoading } from '../../../../../entities'
import { EntityPopup } from '../../../../../features/entity/ui'
import { SectionWrapper } from '../../../../../shared/ui'

export default function Files(props) {
	return (
		<>
			<SectionWrapper section={{ header: 'ФАЙЛИ ДЛЯ ПОЯСНЕННЯ' }}>
				<EntityPopup
					deleteSubject={props.deleteFile}
					showPopupState={props.showPopupState}
				/>
				<div className='style-files'>
					{props.selectedFilesState.selectedFiles.map(item => (
						<FileCard
							key={item.documentId}
							item={item}
							file={props.file}
							setFile={props.setFile}
							bottomSheetState={props.bottomSheetState}
							bindTarget={props.showPopupState.bindTarget}
						/>
					))}
				</div>
				{props.selectedFilesState.isLoading && <FileCardLoading count={2}/>}
			</SectionWrapper>
		</>
	)
}
