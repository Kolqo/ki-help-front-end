import './styles.css'
import { PaperclipIcon } from '../../assets'
import { SectionWrapper } from '../../../../../shared/ui'

export default function SpecialInput(props) {
	return (
		<>
			<div className='style-special-input'>
				<SectionWrapper section={{ header: 'ЗАПИТАННЯ' }}>
					<div className='special-input-input-wrapper'>
						<label className='load-file no-focus-and-active'>
							<PaperclipIcon />
							<input
								type='file'
								style={{ display: 'none' }}
								onChange={props.onSetFiles}
								multiple
							/>
						</label>
						<input
							className='class-input'
							value={props.value}
							placeholder='Напишіть повідомлення'
							onChange={e => props.onChange(e.target.value)}
						/>
					</div>
				</SectionWrapper>
			</div>
		</>
	)
}
