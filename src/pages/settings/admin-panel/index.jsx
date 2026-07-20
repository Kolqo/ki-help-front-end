import './styles.css'

import {
	CategoriesWrapper,
	ListTemplate,
	NavigationItem,
	StatusSwitch,
} from '../../../shared/ui'

import { useGoBack, useRoles, useTechWork } from '../../../shared/hooks'

import { adminPanelItems } from './const'

export default function AdminPanel() {
  useGoBack('/settings')
  const { isAdmin } = useRoles()
  const { isTechWork, toggleTechWork } = useTechWork()

	return (
		<>
			<div className='container-admin-panel'>
				{adminPanelItems(isAdmin()).map((category, index) => (
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
				{isAdmin() && (
					<CategoriesWrapper>
						<ListTemplate
							centerData={{ header: 'Технічні роботи' }}
							rightData={
								<StatusSwitch isSwitch={isTechWork} setIsSwitch={toggleTechWork} />
							}
						/>
					</CategoriesWrapper>
				)}
			</div>
		</>
	)
}
