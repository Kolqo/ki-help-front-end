import './styles.css'

import { IdentifierCard, LoadingIdentifierCard } from '../../../../../entities'
import { EntityPopup } from '../../../../../features/entity/ui'
import { SectionWrapper } from '../../../../../shared/ui'

export default function Identifiers(props) {
	return (
		<>
			<SectionWrapper section={{ header: 'ІДЕНТИФІКАТОРИ' }}>
				<EntityPopup
					deleteSubject={props.deleteFile}
					showPopupState={props.showPopupState}
				/>
				<div className='style-files'>
					{props.selectedIdentifiersState.selectedIdentifiers.map(item => (
						<IdentifierCard
							key={item.id}
							item={item}
							identifier={props.identifier}
							setIdentifier={props.setIdentifier}
							bottomSheetState={props.bottomSheetState}
							bindTarget={props.showPopupState.bindTarget}
						/>
					))}
				</div>
				{props.selectedIdentifiersState.isLoading && (
					<LoadingIdentifierCard count={2} />
				)}
			</SectionWrapper>
		</>
	)
}
