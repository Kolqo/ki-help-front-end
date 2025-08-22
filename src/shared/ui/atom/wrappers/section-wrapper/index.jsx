import './styles.css'

export default function SectionWrapper(props) {
	return (
		<div className='style-section-wrapper'>
			<div className='section header-section'>
				<div>{props.section?.header}</div>
				{props.actionHeader}
			</div>
			{props.children}
			<div className='section'>{props.section?.footer}</div>
		</div>
	)
}
