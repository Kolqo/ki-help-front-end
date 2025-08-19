import './styles.css'

import { ClassicInput, SectionWrapper } from '../../'

export default function InputGroup(props) {

	return (
		<div className={`style-input-group ${props.className || ''}`}>
			{props.fields.map((field, index) => (
				<SectionWrapper section={field.section} key={index}>
					<ClassicInput
						ref={el => (props.inputRefs.current[index] = el)}
						placeholder={field.placeholder}
						onKeyDown={e => props.onKeyDown(e, index)}
						onChange={props.onChange}
					/>
				</SectionWrapper>
			))}
		</div>
	)
}
