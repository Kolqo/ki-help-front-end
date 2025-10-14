import './styles.css'

export default function LinkWrapper(props) {
	return (
		<span
			className='style-link-wrapper no-focus-and-active no-underline'
			onClick={() => window.open(props.href, '_blank')}
		>
			{props.children}
		</span>
	)
}
