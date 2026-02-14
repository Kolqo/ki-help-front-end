import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import NavbarItems from '../../../const/navbarItems'
import './styles.css'

export default function Navbar() {
	const navigate = useNavigate()
	const location = useLocation()

	const navRef = useRef(null)
	const isDraggingRef = useRef(false)
	const rafRef = useRef(null)

	// ✅ ref для синхронного “selectedId”, щоб не ловити race-condition зі state + raf
	const selectedIdRef = useRef(null)

	const [dragging, setDragging] = useState(false)
	const [selectedId, setSelectedId] = useState(null)
	const [slider, setSlider] = useState({ x: 0, w: 0, visible: false })
	const [navWidth, setNavWidth] = useState(0)

	// Визначаємо поточний ID на основі URL
	const currentId = useMemo(() => {
		const path = location.pathname
		const currentItem = NavbarItems.find(item => item.url === path)
		return currentItem ? currentItem.id : NavbarItems[0].id
	}, [location.pathname])

	const activeId = dragging ? (selectedId ?? currentId) : currentId

	const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

	// Оновлення ширини при зміні розміру
	useEffect(() => {
		const observer = new ResizeObserver(entries => {
			for (let entry of entries) {
				setNavWidth(entry.contentRect.width + 8) // +padding
			}
		})

		if (navRef.current) observer.observe(navRef.current)
		return () => observer.disconnect()
	}, [])

	const snapToId = id => {
		const navEl = navRef.current
		const itemEl = navEl?.querySelector(`[data-navbar-item-id="${id}"]`)
		if (!navEl || !itemEl) return

		const navRect = navEl.getBoundingClientRect()
		const r = itemEl.getBoundingClientRect()

		setSlider({
			x: r.left - navRect.left,
			w: r.width,
			visible: true,
		})
	}

	const pickBestIdBySlider = (sliderX, sliderW) => {
		const navEl = navRef.current
		if (!navEl) return null

		const navRect = navEl.getBoundingClientRect()
		const sliderCenter = sliderX + sliderW / 2
		const items = Array.from(navEl.querySelectorAll('[data-navbar-item-id]'))

		let bestId = null
		let minDistance = Infinity

		items.forEach(el => {
			const r = el.getBoundingClientRect()
			const center = r.left - navRect.left + r.width / 2
			const dist = Math.abs(center - sliderCenter)
			if (dist < minDistance) {
				minDistance = dist
				bestId = el.getAttribute('data-navbar-item-id')
			}
		})

		return bestId
	}

	const updateByPointer = clientX => {
		if (!navRef.current) return

		const navRect = navRef.current.getBoundingClientRect()

		// Беремо ширину активного елемента (поточний маршрут)
		const itemWidth =
			navRef.current.querySelector(`[data-navbar-item-id="${currentId}"]`)
				?.offsetWidth || 100

		const localX = clientX - navRect.left
		const xRaw = localX - itemWidth / 2

		const minX = 4
		const maxX = navRect.width - itemWidth - 4
		const x = clamp(xRaw, minX, maxX)

		setSlider(prev => ({ ...prev, x, w: itemWidth, visible: true }))

		// ✅ визначаємо найближчий елемент і пишемо в ref (синхронно) + в state (для UI)
		const bestId = pickBestIdBySlider(x, itemWidth)
		if (bestId) {
			selectedIdRef.current = bestId
			if (bestId !== selectedId) setSelectedId(bestId)
		}
	}

	const startDrag = e => {
		isDraggingRef.current = true
		setDragging(true)
		e.currentTarget.setPointerCapture(e.pointerId)

		// одразу по down фіксуємо
		updateByPointer(e.clientX)
	}

	const moveDrag = e => {
		if (!isDraggingRef.current) return

		if (rafRef.current) cancelAnimationFrame(rafRef.current)
		rafRef.current = requestAnimationFrame(() => updateByPointer(e.clientX))
	}

	const endDrag = e => {
		if (!isDraggingRef.current) return

		// ✅ гасимо pending raf, щоб не прийшло "пізнє" оновлення після endDrag
		if (rafRef.current) {
			cancelAnimationFrame(rafRef.current)
			rafRef.current = null
		}

		// ✅ фінально фіксуємо позицію по останньому clientX (без raf)
		if (e?.clientX != null) updateByPointer(e.clientX)

		isDraggingRef.current = false
		setDragging(false)

		// ✅ беремо finalId з ref (надійно)
		const finalId = selectedIdRef.current ?? currentId

		snapToId(finalId)

		const item = NavbarItems.find(i => i.id === finalId)
		if (item?.url && item.url !== location.pathname) {
			navigate(item.url)
		}

		setSelectedId(null)
		selectedIdRef.current = null
	}

	useEffect(() => {
		if (!dragging) snapToId(currentId)
	}, [currentId, dragging, navWidth])

	// Розрахунок маски для кольорового шару
	const rightInset = navWidth - (slider.x + slider.w)
	const clipPath = `inset(4px ${rightInset}px 4px ${slider.x}px round 28.5px)`

	return (
		<div
			ref={navRef}
			className={`class-navbar ${dragging ? 'dragging' : ''}`}
			onPointerDown={startDrag}
			onPointerMove={moveDrag}
			onPointerUp={endDrag}
			onPointerCancel={endDrag}
		>
			{/* Повзунок (фон) */}
			<div
				className='navbar-slider'
				style={{
					width: `${slider.w}px`,
					transform: `translateX(${slider.x}px)`,
					opacity: slider.visible ? 1 : 0,
				}}
			/>

			{/* Нижній шар (тьмяний) */}
			{NavbarItems.map(item => (
				<div
					key={item.id}
					data-navbar-item-id={item.id}
					className={`navbar-item ${activeId === item.id ? 'item-choose' : ''}`}
				>
					{item.icon}
					<span>{item.label}</span>
				</div>
			))}

			{/* Верхній шар (кольоровий + clipPath) */}
			<div className='navbar-overlay' style={{ clipPath }}>
				{NavbarItems.map(item => (
					<div key={item.id} className='navbar-item overlay-colored'>
						{item.icon}
						<span>{item.label}</span>
					</div>
				))}
			</div>
		</div>
	)
}
