import { Avatar, Checkbox, ListItem } from '../../../../shared/ui'

export default function ChoiceItem(props) {

  //const UserPhoto = () => {
  //  return (
	//		<div className='user-photo'>
	//			<img src={props.listItem.photo} />
	//		</div>
	//	)
  //}

	return (
		<>
			<ListItem
				leftData={
					props.listItem?.photo ? (
						<Avatar photo={props.listItem.photo} diameter={26}/>
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
