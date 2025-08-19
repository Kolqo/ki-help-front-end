import { useEffect } from 'react'

export default function useScrollPagination(
	loadMore,
	hasMoreData = true
) {
	useEffect(() => {
		const containerElement = document.querySelector('.container')
		if (!containerElement) return

		const scrollHandler = () => {
			if (!hasMoreData) return
			if (
				containerElement.scrollHeight -
					(containerElement.scrollTop + containerElement.clientHeight) <
				100
			) {
				loadMore()
			}
		}

		containerElement.addEventListener('scroll', scrollHandler)
		return () => containerElement.removeEventListener('scroll', scrollHandler)
	}, [loadMore, hasMoreData])
}
