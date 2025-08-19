import './styles.css'

import { ButtonItem, CategoriesWrapper } from '../../'

export default function OptionRow(props) {
  const isOption = props.option

  return (
		<>
			<CategoriesWrapper>
				<ButtonItem
					className={`style-option-row ${isOption ? 'is-option' : ''}`}
					centerData={{ header: props.header }}
					rightData={
						<>
							{isOption ? props.option : 'Вибрати'}
							{props.rightIcon}
						</>
					}
					onClick={props.onClick}
				/>
			</CategoriesWrapper>
		</>
	)
}
