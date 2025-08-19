import './styles.css'

import { CloseButton } from '../../../'

export default function BottomSheet(props) {
	return (
		<>
			{props.bottomSheetState.isVisible && (
				<div
					className='sheet-overlay'
					onClick={props.bottomSheetState.closeSheet}
				>
					<div
						className={`sheet ${
							props.bottomSheetState.isOpen ? 'sheet-open' : 'sheet-close'
						}`}
						onClick={e => e.stopPropagation()}
					>
						<div className='header-sheet'>
							<CloseButton
								diameter='30'
								background='#EEEEEF'
								crossColor='#999999'
								onClick={() => props.bottomSheetState.closeSheet()}
							/>
						</div>
						<div className='content-sheet'>
              {props.children}
            </div>
					</div>
				</div>
			)}
		</>
	)
}
