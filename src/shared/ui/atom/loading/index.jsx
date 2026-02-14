import './styles.css'

export default function Loading({
	size = 50,
	thickness = 0.08, // відносна товщина
	className = '',
}) {
	return (
		<div
			className={`lds-spinner ${className}`}
			style={{
				'--size': `${size}px`,
				'--bar-w': `${size * thickness}px`,
				'--bar-h': `${size * 0.28}px`,
			}}
		>
			{Array.from({ length: 8 }).map((_, i) => (
				<div key={i} />
			))}
		</div>
	)
}
