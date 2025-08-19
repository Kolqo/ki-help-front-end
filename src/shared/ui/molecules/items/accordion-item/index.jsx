import './styles.css'

import { useToggle } from '../../../../hooks'

export default function AccordionItem(props) {
	const { state, toggle } = useToggle()

	return (
		<div className={`style-accordion-item ${state ? 'expanded' : 'collapsed'}`}>
			<div
				className='upper-wrapper'
				onClick={toggle}
				style={{ height: `${props.height}px` }}
			>
				{props.leftData}
				<div className='center-data'>
					<p className='header-text'>{props.centerData?.header}</p>
					<p className='footer-text'>{props.centerData?.footer}</p>
				</div>
				<div className='right-data'>{props.rightData}</div>
			</div>
			<div className='bottom-wrapper'>
				<div className='bottom-text'>{props.bottomData}</div>
			</div>
		</div>
	)
}
