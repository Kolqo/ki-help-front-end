import { ChoiceItem, LoadingChoiceItem } from '../../../'
import { SectionWrapper, CategoriesWrapper } from '../../../../shared/ui'

export default function ChoiceItemList(props) {
	const idConfigs = {
		default: item => item.id,
		developer: item => item.telegramId,
		argument: item => item.id,
    task: item => item.id
	}

	const displayConfigs = {
		default: item => ({ header: item.name }),
		developer: item => ({ header: item.username }),
		argument: item => ({ header: item.name, footer: item.description }),
		task: item => ({ header: item.title }),
	}

  //if (props.isLoading) {
  //  return (
	//		<SectionWrapper section={props.section}>
	//			<LoadingChoiceItem />
	//		</SectionWrapper>
	//	)
  //}

	return (
		<>
			<SectionWrapper section={props.section}>
				<CategoriesWrapper>
					{props.objectList.map(item => (
						<ChoiceItem
							key={idConfigs[props.displayMode](item)}
							isChecked={props.isChecked[idConfigs[props.displayMode](item)]}
							setIsChecked={() =>
								props.setIsChecked(idConfigs[props.displayMode](item))
							}
							centerData={displayConfigs[props.displayMode](item)}
							bindTarget={props.bindTarget}
							listItem={item}
						/>
					))}
					{props.isLoading && <LoadingChoiceItem />}
				</CategoriesWrapper>
			</SectionWrapper>
		</>
	)
}
