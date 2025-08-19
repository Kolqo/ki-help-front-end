import { CategoriesWrapper, ListItem, SectionWrapper, StatusSwitch } from "../../../../../shared/ui";

export default function SwitchItem(props) {

  const handleUpdateData = () => {
    const data = props.taskDataState.data
    props.taskDataState.updateData({
			autoGenerate:
				data.type === 'TEST' ? true : !props.taskDataState.data.autoGenerate,
		})
  }

	return (
		<>
			<SectionWrapper
				section={{
					footer:
						'Включивши автогенерацію, користувач буде отримувати завдання зразу після купівлі.',
				}}
			>
				<CategoriesWrapper>
					<ListItem
						centerData={{ header: 'Авто генерація' }}
						rightData={
							<StatusSwitch
								isSwitch={props.taskDataState.data.autoGenerate}
								setIsSwitch={handleUpdateData}
							/>
						}
					/>
				</CategoriesWrapper>
			</SectionWrapper>
		</>
	)
}
