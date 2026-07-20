import { RouterProvider } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import '../index.css'

import useRouterConfig from '../model/useRouterConfig.jsx'
import { Loading, Blocked } from '../../pages/task'
import { useRoles, useTechWork } from '../../shared/hooks'

/** ======================
 *  Color helpers (HEX)
 *  ====================== */
function getCssVar(name) {
	return getComputedStyle(document.documentElement)
		.getPropertyValue(name)
		.trim()
}

function normalizeHex(hex) {
	if (!hex) return ''
	let h = hex.trim().toLowerCase()
	if (!h.startsWith('#')) return ''
	if (h.length === 4) h = `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`
	return h.length === 7 ? h : ''
}

function hexToRgb(hex) {
	const h = normalizeHex(hex)
	if (!h) return null
	const num = parseInt(h.slice(1), 16)
	return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

function brightness(hex) {
	const c = hexToRgb(hex)
	if (!c) return NaN
	// perceptual luminance-ish
	return 0.299 * c.r + 0.587 * c.g + 0.114 * c.b
}

function lighten(hex, amt) {
	const c = hexToRgb(hex)
	if (!c) return hex
	const r = Math.min(255, c.r + amt)
	const g = Math.min(255, c.g + amt)
	const b = Math.min(255, c.b + amt)
	return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

function darken(hex, amt) {
	const c = hexToRgb(hex)
	if (!c) return hex
	const r = Math.max(0, c.r - amt)
	const g = Math.max(0, c.g - amt)
	const b = Math.max(0, c.b - amt)
	return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

/** ======================
 *  TG UI layer normalize rules
 *
 *  - If main == ui-bg -> make ui-bg slightly lighter
 *  - If LIGHT theme: ensure main < bottom < ui-bg (by brightness)
 *  - If DARK theme: if bottom matches main/ui-bg -> make bottom lighter
 *  Writes into: --ui-bg, --ui-bottom-bar-bg, --color-bg-main
 *  ====================== */
function normalizeTelegramUiLayers() {
	const root = document.documentElement
	const theme = root.getAttribute('data-theme') // "light" | "dark"

	const tgMain = normalizeHex(getCssVar('--tg-theme-secondary-bg-color'))
	const tgSection = normalizeHex(getCssVar('--tg-theme-section-bg-color'))
	const tgBottom = normalizeHex(getCssVar('--tg-theme-bottom-bar-bg-color'))

	if (!tgMain || !tgSection) return

	let finalMain = tgMain
	let finalUiBg = tgSection
	let finalBottom = tgBottom || tgSection

	// Rule 0: if card == main -> make card a bit lighter
	if (finalUiBg === finalMain) {
		finalUiBg = lighten(finalUiBg, 12)
	}

	if (theme === 'light') {
		// Goal: brightness(main) < brightness(bottom) < brightness(uiBg)

		const bMain = brightness(finalMain)
		const bCard = brightness(finalUiBg)

		// If card accidentally darker than main (rare), fix card first
		if (Number.isFinite(bMain) && Number.isFinite(bCard) && bCard <= bMain) {
			finalUiBg = lighten(finalUiBg, 18)
		}

		let bBottom = brightness(finalBottom)
		const bMain2 = brightness(finalMain)
		const bCard2 = brightness(finalUiBg)

		// If bottom missing or invalid -> start from main
		if (!Number.isFinite(bBottom)) {
			finalBottom = lighten(finalMain, 10)
			bBottom = brightness(finalBottom)
		}

		// Ensure bottom > main (strictly)
		if (
			Number.isFinite(bMain2) &&
			Number.isFinite(bBottom) &&
			bBottom <= bMain2
		) {
			// push bottom upwards from main, but not too bright
			finalBottom = lighten(finalMain, 14)
			bBottom = brightness(finalBottom)
		}

		// Ensure bottom < card (strictly)
		if (
			Number.isFinite(bCard2) &&
			Number.isFinite(bBottom) &&
			bBottom >= bCard2
		) {
			// pull bottom down from card
			finalBottom = darken(finalUiBg, 10)
			bBottom = brightness(finalBottom)
		}

		// If after adjustments bottom still not between (very close colors),
		// do a slightly stronger nudge:
		const bBottom2 = brightness(finalBottom)
		if (
			Number.isFinite(bMain2) &&
			Number.isFinite(bCard2) &&
			Number.isFinite(bBottom2) &&
			!(bMain2 < bBottom2 && bBottom2 < bCard2)
		) {
			// set bottom to "card darkened a bit" but keep above main
			let candidate = darken(finalUiBg, 14)
			if (brightness(candidate) <= brightness(finalMain)) {
				candidate = lighten(finalMain, 18)
			}
			finalBottom = candidate
		}
	}

	if (theme === 'dark') {
		// In dark mode we just avoid merging by lifting layers when equal
		if (finalBottom === finalMain || finalBottom === finalUiBg) {
			finalBottom = lighten(finalBottom, 18)
		}
		// Optional: if bottom still equals uiBg after uiBg changed
		if (finalBottom === finalUiBg) {
			finalBottom = lighten(finalBottom, 22)
		}
	}

	// Write final vars used by your CSS
	root.style.setProperty('--color-bg-main', finalMain)
	root.style.setProperty('--ui-bg', finalUiBg)
	root.style.setProperty('--ui-bottom-bar-bg', finalBottom)
}

/** ======================
 *  Apply theme from Telegram
 *  ====================== */
function applyThemeFromTelegram() {
	const tg = window.Telegram?.WebApp
	if (!tg) return

	document.documentElement.setAttribute('data-theme', tg.colorScheme) // "light" | "dark"

	// TG может обновить CSS vars чуть позже — нормализуем на следующем кадре
	requestAnimationFrame(() => {
		normalizeTelegramUiLayers()
	})
	// и на всякий случай ещё раз в microtask/timeout
	setTimeout(() => {
		normalizeTelegramUiLayers()
	}, 0)
}

export const MyAppRouter = () => {
	const router = useRouterConfig()
	const { getJwt, isAdmin } = useRoles()
	const { isTechWork } = useTechWork()

	const tg = window.Telegram?.WebApp

	const { isMobile, hasMobileFeatures } = useMemo(() => {
		const ua = navigator.userAgent
		const mobile =
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)

		const version = parseFloat(tg?.version || '0')
		return { isMobile: mobile, hasMobileFeatures: mobile && version > 7.1 }
	}, [tg?.version])

	useEffect(() => {
		if (!tg) return

		tg.ready?.()

		applyThemeFromTelegram()

		// theme sync
		tg.onEvent?.('themeChanged', applyThemeFromTelegram)

		tg.expand?.()

		if (hasMobileFeatures) {
			tg.requestFullscreen?.()
		}

		return () => {
			tg.offEvent?.('themeChanged', applyThemeFromTelegram)
		}
	}, [tg, hasMobileFeatures])

	const mobilePadding = hasMobileFeatures ? 'mobile-padding' : ''

	if (isTechWork && !isAdmin()) {
		return (
			<div className='container'>
				<div className={`screen ${mobilePadding}`}>
					<div
						style={{
							height: '100vh',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						Технічні роботи
					</div>
				</div>
			</div>
		)
	}

	const isNickname = !!tg?.initDataUnsafe?.user?.username
	if (tg && !isNickname) {
		return (
			<div className='container'>
				<div className={`screen ${mobilePadding}`}>
					<div
						style={{
							height: '100vh',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							textAlign: 'center',
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
			<div className='container'>
				<div className={`screen ${mobilePadding}`}>
					<Blocked />
				</div>
			</div>
		)
	}

	if (!router) return <Loading />

	return (
		<div className='container'>
			<div className={`screen ${mobilePadding}`}>
				<RouterProvider router={router} />
			</div>
		</div>
	)
}

export default MyAppRouter
