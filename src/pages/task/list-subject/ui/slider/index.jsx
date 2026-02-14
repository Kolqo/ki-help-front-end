import './styles.css'

import React, { useEffect, useState } from 'react'

import { NewsItem } from '../../../../../entities'

import getNewsItem from '../../../../../entities/news-item/api/getNewsItem.js'

const GAP_PX = 20
const SLIDE_DURATION_MS = 5000

export default function Slider() {
	const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
		if (getNewsItem.length <= 1) return

		const interval = setInterval(() => {
			setCurrentSlide(prev => (prev === getNewsItem.length - 1 ? 0 : prev + 1))
		}, SLIDE_DURATION_MS)

		return () => clearInterval(interval)
	}, [currentSlide])

	return (
		<>
			<div className='slider'>
				<div
					className='group'
					style={{
						transform: `translateX(calc(-${currentSlide} * (100% + ${GAP_PX}px)))`,
					}}
				>
					{getNewsItem.map((data, index) => (
						<React.Fragment key={index}>
							<NewsItem newsItem={data} />
						</React.Fragment>
					))}
				</div>
				{getNewsItem.length > 1 && (
					<div className='indicators'>
						{getNewsItem.map((_, index) => (
							<button
								key={index}
								type='button'
								className={`indicator no-focus-and-active ${currentSlide === index ? 'active' : ''}`}
								onClick={() => setCurrentSlide(index)}
								style={{
									['--dur']: `${SLIDE_DURATION_MS}ms`,
									['--runKey']: currentSlide,
								}}
								aria-label={`Go to slide ${index + 1}`}
							>
								<span className='fill' />
							</button>
						))}
					</div>
				)}
			</div>
		</>
	)
}
