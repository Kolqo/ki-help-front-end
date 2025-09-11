import { useState } from 'react'

const useDownload = () => {
	const [isLoading, setIsLoading] = useState(false)

	const handleDownload = async (fileUrl, fileName) => {
		console.log(fileUrl, fileName)
		if (!(window.Telegram && window.Telegram.WebApp)) {
			console.error('Telegram WebApp is not available')
			return
		}

		const isWindows = window.Telegram.WebApp.platform === 'tdesktop'
		const version = Number(window.Telegram.WebApp.version) || 0

		if (isWindows || version < 8) {
			setIsLoading(true)
			try {
				const response = await fetch(fileUrl)
				if (!response.ok) throw new Error('Failed to fetch file')
				const blob = await response.blob()

				const link = document.createElement('a')
				link.href = URL.createObjectURL(blob)
				link.download = fileName || 'file.txt'
				link.click()
				URL.revokeObjectURL(link.href)
			} catch (err) {
				console.error('Download error:', err)
			} finally {
				setIsLoading(false)
			}
		} else {
			setIsLoading(true)
			window.Telegram.WebApp.downloadFile({ url: fileUrl, file_name: fileName })
			setTimeout(() => setIsLoading(false), 2000)
		}
	}

	return { isLoading, handleDownload }
}

export default useDownload
