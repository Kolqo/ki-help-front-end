import './styles.css'

export default function CategoriesWrapper(props) {
	return (
		<div
			className={`style-categories-wrapper ${props.className ? props.className : ''}`}
		>
			{props.children}
		</div>
	)
}
