function typeAIMessageAsync(
	fullContent,
	messageIndex,
	setMessages,
	interval = 200
) {
	return new Promise(resolve => {
		const tokens = fullContent.match(/(\r?\n|\s+|[^\s]+)/g) || [fullContent]
		let i = 0

		const typingInterval = setInterval(() => {
			setMessages(prev => {
				const updated = [...prev]
				const currentContent = tokens.slice(0, i + 1).join('')
				const last = updated[messageIndex] || { role: 'ASSISTANT', content: '' }
				updated[messageIndex] = {
					...last,
					role: 'ASSISTANT',
					content: currentContent,
				}
				return updated
			})

			i++
			if (i >= tokens.length) {
				clearInterval(typingInterval)
				resolve()
			}
		}, interval)
	})
}

export default typeAIMessageAsync