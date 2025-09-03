import { useEffect, useRef } from 'react'

export default function useScrollPagination(
	loadMore,
	hasMoreData = true,
	container = '.container'
) {
	const sentinelRef = useRef(null)

	useEffect(() => {
		if (!hasMoreData) return
		const sentinel = sentinelRef.current
		if (!sentinel) return

		const observer = new IntersectionObserver(
			entries => {
				const [entry] = entries
				if (entry.isIntersecting && hasMoreData) {
					loadMore()
				}
			},
			{
				root: document.querySelector(container), // можна лишити null для window
				rootMargin: '0px 0px 100px 0px', // коли лишається 100px до низу
				threshold: 0.1,
			}
		)

		observer.observe(sentinel)

		return () => {
			if (sentinel) observer.unobserve(sentinel)
			observer.disconnect()
		}
	}, [loadMore, hasMoreData])

	return sentinelRef
}
