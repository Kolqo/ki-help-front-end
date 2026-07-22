import './styles.css'

import { CategoriesWrapper, NavigationItem } from '../../../shared/ui'

import { useGoBack, useRoles } from '../../../shared/hooks'

import { adminPanelItems } from './const'

export default function AdminPanel() {
  useGoBack('/settings')
  const { isAdmin } = useRoles()

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
			</div>
		</>
	)
}
