import './styles.css'

import { CategoriesWrapper, NavigationItem } from '../../../shared/ui'

import { useGoBack } from '../../../shared/hooks'

import { devPanelItems } from './const'

export default function DevPanel() {
  useGoBack('/settings')

	return (
		<>
			<div className='container-dev-panel'>
				{devPanelItems.map((category, index) => (
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
