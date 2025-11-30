import './styles.css'

export default function Textarea(props) {
  return (
		<div className='style-textarea-box'>
			<textarea
				className='style-textarea'
				placeholder='Розпочати розмову з поясненням'
				value={props.value}
				onChange={e => props.setValue(e)}
				onKeyDown={handleKeyDown}
			/>
		</div>
	)
}
