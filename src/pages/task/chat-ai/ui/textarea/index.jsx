import './styles.css'

export default function Textarea(props) {
	const handleKeyDown = e => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			props.onSend()
		}
	}

	return (
		<div className='style-textarea-box'>
			<textarea
				className='style-textarea'
				placeholder='Розпочати розмову з поясненням'
				value={props.value}
				onChange={e => props.setValue(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
		</div>
	)
}
