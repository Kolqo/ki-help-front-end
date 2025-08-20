import { Avatar, Checkbox, ListTemplate } from '../../../../shared/ui'

export default function ChoiceItem(props) {
	return (
		<>
			<ListTemplate
				leftData={
					props.listItem?.photo ? (
						<Avatar photo={props.listItem.photo} diameter={26} />
					) : (
						<Checkbox
							isChecked={props.isChecked}
							setIsChecked={props.setIsChecked}
						/>
					)
				}
				centerData={props.centerData}
				rightData={
					props.listItem?.photo && (
						<Checkbox
							isChecked={props.isChecked}
							setIsChecked={props.setIsChecked}
						/>
					)
				}
				bindTarget={props.bindTarget}
				listItem={props.listItem}
			/>
		</>
	)
}
