import './styles.css'

import { MenuSetting } from '../../../../../shared/ui'
import listSettings from '../../const/listSettings.jsx'
import { useRoles } from '../../../../../shared/hooks'

export default function List() {
	const { isDeveloper, isAdmin } = useRoles()

	return (
		<div className='style-list'>
			{listSettings.map(item => {
				if (item.isForAdmin && !isAdmin()) return null

				if (item.isForDeveloper && !isDeveloper()) return null

				return item.name === 'Угоди користувача' ? (
					<MenuSetting
						key={item.id}
						className='rules-setting'
						menuSetting={item}
					/>
				) : (
					<MenuSetting key={item.id} menuSetting={item} />
				)
			})}
		</div>
	)
}
