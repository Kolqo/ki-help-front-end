import './styles.css'

export default function Avatar(props) {

	if (!props.photo) return

	return (
		<>
			<div
				className='style-avatar'
				style={{
					height: `${props.diameter}px`,
					width: `${props.diameter}px`,
				}}
			>
				<img src={props?.photo} />
			</div>
		</>
	)
}
