import './styles.css'

import { useEffect, useRef } from 'react'

import { PaperclipIcon } from '../../assets'

import { SectionWrapper } from '../../../../../shared/ui'

export default function SpecialInput(props) {
	const textareaRef = useRef(null)

	useEffect(() => {
		if (!textareaRef.current) return
		textareaRef.current.style.height = 'auto'
		textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
	}, [props.value])

	return (
		<div className='style-special-support-input'>
			<SectionWrapper section={{ header: 'ЗАПИТАННЯ' }}>
				<div className='special-input-wrapper'>
					<textarea
						ref={textareaRef}
						value={props.value}
						className='textarea'
						placeholder='Напишіть запитання...'
						onChange={e => props.onChange(e.target.value)}
						rows={1} // мінімальна висота — далі росте сама
					/>
					<div className='textarea-bottom'>
						<label className='load-file no-focus-and-active'>
							<PaperclipIcon />
							<input
								type='file'
								style={{ display: 'none' }}
								onChange={props.onSetFiles}
								multiple
							/>
						</label>
					</div>
				</div>
			</SectionWrapper>
		</div>
	)
}
