import './styles.css'

import { useNavigate } from 'react-router-dom'

import {
	ButtonTemplate,
	CategoriesWrapper,
	NavigationItem,
} from '../../../shared/ui'

import { settingsPanelItems } from './const'

export default function SettingsPanel() {
	const navigate = useNavigate()

	return (
		<>
			<div className='container-settings-panel'>
				{settingsPanelItems.map((category, index) => (
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
						onClick={() => navigate('/rules')}
					/>
				</CategoriesWrapper>
			</div>
		</>
	)
}
