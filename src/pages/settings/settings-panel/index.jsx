import './styles.css'

import {
	ButtonTemplate,
	CategoriesWrapper,
	NavigationItem,
} from '../../../shared/ui'

import { settingsPanelItems } from './const'
import { useRoles } from '../../../shared/hooks'

export default function SettingsPanel() {
  const { isAdmin, isDeveloper } = useRoles()

	return (
		<>
			<div className='container-settings-panel'>
				{settingsPanelItems(isAdmin(), isDeveloper()).map((category, index) => (
					<CategoriesWrapper key={index}>
						{category.map(
							(item, index) =>
								item.allowed && (
									<NavigationItem
										key={index}
										leftData={item.leftData}
										centerData={item.centerData}
										url={item.url}
									/>
								)
						)}
					</CategoriesWrapper>
				))}
				<CategoriesWrapper>
					<ButtonTemplate
						className='nav-rules'
						centerData={{ header: 'Угоди користувача' }}
						onClick={() =>
							window.open('https://kihelp.gitbook.io/kihelp-docs', '_blank')
						}
					/>
				</CategoriesWrapper>
			</div>
		</>
	)
}
