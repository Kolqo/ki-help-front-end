import './styles.css'

import { CategoriesWrapper, NavigationItem } from '../../../shared/ui'

import { useGoBack } from '../../../shared/hooks'

import { adminPanelItems } from './const'

export default function AdminPanel() {
  useGoBack('/settings')

	return (
		<>
			<div className='container-admin-panel'>
				{adminPanelItems.map((category, index) => (
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
