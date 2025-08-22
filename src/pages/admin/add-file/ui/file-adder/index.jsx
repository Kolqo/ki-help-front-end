import { forwardRef } from 'react'
import { Adder, CategoriesWrapper, SectionWrapper } from '../../../../../shared/ui'

const FileAdder = forwardRef((props, ref) => {
	return (
		<>
			<input
				type='file'
				ref={ref}
				style={{ display: 'none' }}
				onChange={props.onChange}
			/>
			<SectionWrapper section={{ header: 'ФАЙЛ ДЛЯ ПОЯСНЕННЯ' }}>
				<CategoriesWrapper>
					<Adder
						centerText='Додати файл'
						isVisible={true}
						onClick={props.onClick}
					/>
				</CategoriesWrapper>
			</SectionWrapper>
		</>
	)
})
export default FileAdder