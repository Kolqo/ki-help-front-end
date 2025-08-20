import './styles.css'

import { useNavigate } from 'react-router-dom'

import { ButtonTemplate, CategoriesWrapper, NavigationItem } from '../../../shared/ui'

import { listSettings } from './const'

export default function ListSetting() {
  const navigate = useNavigate()

	return (
		<>
			<div className='container-list-setting'>
				{listSettings.map(category => (
					<CategoriesWrapper>
						{category.map((item, index) => (
							<NavigationItem
								leftData={item.leftData}
								centerData={item.centerData}
							/>
						))}
					</CategoriesWrapper>
				))}
				<CategoriesWrapper>
					<ButtonTemplate className='nav-rules' centerData={{header: 'Угоди користувача'}} onClick={() => navigate('/rules')}/>
				</CategoriesWrapper>
			</div>
		</>
	)
}
