import { RouterProvider } from 'react-router-dom'
import '../index.css'

import useRouterConfig from '../model/useRouterConfig.jsx'

import { Loading, Blocked } from '../../pages/task'
import { useRoles } from '../../shared/hooks'

export const MyAppRouter = () => {
	const userAgent = navigator.userAgent
	const isMobile =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			userAgent
		)
	const tg = window.Telegram.WebApp
	const version = parseFloat(tg.version)
	const hasMobileFeatures = isMobile && version > 7.1

	tg.expand()

	if (hasMobileFeatures) {
		tg.requestFullscreen()
	}

	const mobilePadding = hasMobileFeatures ? 'mobile-padding' : ''

	const router = useRouterConfig()

	const { getJwt, isAdmin } = useRoles()

  const isTechWork = false
	if (isTechWork && !isAdmin()) {
		return (
			<div className={`container`}>
				<div className={`screen ${mobilePadding}`}>
					<div style={{height: '100vh', display:'flex', alignItems: 'center', justifyContent: 'center'}}>Технічні роботи</div>
				</div>
			</div>
		)
	}

  const isNickname = !!tg.initDataUnsafe?.user?.username
  if (!isNickname) {
    		return (
					<div className={`container`}>
						<div className={`screen ${mobilePadding}`}>
							<div
								style={{
									height: '100vh',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									textAlign: 'center', // щоб текст був вирівняний по центру
								}}
							>
								Встановіть нікнейм в телеграмі, щоб користуватися KIHELP
							</div>
						</div>
					</div>
				)
  }
  
	if (getJwt()?.ban) {
		return (
			<div className={`container`}>
				<div className={`screen ${mobilePadding}`}>
					<Blocked />
				</div>
			</div>
		)
	} else {
		if (!router) {
			return <Loading />
		}

		return (
			<div className={`container`}>
				<div className={`screen ${mobilePadding}`}>
					<RouterProvider router={router} />
				</div>
			</div>
		)
	}
}

export default MyAppRouter
