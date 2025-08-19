import './styles.css'

export default function SubjectLoading(props) {
	return (
		<>
			{Array.from({ length: props.count }).map((_, index) => (
				<div key={index} className='color-box' />
			))}
		</>
	)
}
