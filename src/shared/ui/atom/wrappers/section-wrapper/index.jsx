import './styles.css'

export default function SectionWrapper(props) {
	return (
		<div className='style-section-wrapper'>
			<div className='section'>{props.section?.header}</div>
			{props.children}
			<div className='section'>{props.section?.footer}</div>
		</div>
	)
}
