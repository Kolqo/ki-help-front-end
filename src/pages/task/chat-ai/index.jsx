import './styles.css'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { FixedButton } from '../../../shared/ui'
import { CharArea, Price, Textarea } from './ui'

import { AiIcon } from './assets'

import { useGetChatMessage, usePostChat } from '../../../features/rag/model'
import { useGoBack } from '../../../shared/hooks'
import { typeAIMessageAsync } from './lib'

export default function ChatAI() {
	useGoBack('/')
  const { expSessionId } = useParams()
	const [messages, setMessages] = useState([])
	const [input, setInput] = useState('')

	const postChatState = usePostChat()
	const getChatMessageState = useGetChatMessage(expSessionId)

  useEffect(() => {
    setMessages(getChatMessageState.chat)
  }, [getChatMessageState.chat])

	useEffect(() => {
		if (postChatState.answer) {
			setMessages(prev => {
				const messageIndex = prev.length - 1
				typeAIMessageAsync(postChatState.answer, messageIndex, setMessages, 50)
				return prev
			})
		} else {
			setMessages(prev => {
				const updated = [...prev]
				updated[updated.length - 1] = {
					role: 'ASSISTANT',
					content: 'Сталася помилка, спробуйте пізніше',
				}
				return updated
			})
		}
	}, [postChatState.answer, postChatState.error.isError])

	const sendMessage = () => {
		if (!input.trim()) return

		const newMessages = [...messages, { role: 'USER', content: input }]
		setMessages(newMessages)
		setInput('')

		setMessages(prev => [
			...prev,
			{
				role: 'ai',
				content: (
					<div className='ai-thinking-box'>
						<AiIcon />
						Думає...
					</div>
				),
			},
		])

		postChatState.handlePost(expSessionId, input)
	}

	return (
		<>
			<div className='container-chat-ai'>
        <Price/>
				<CharArea messages={messages} setValue={setInput} />
				<Textarea value={input} setValue={setInput} onSend={sendMessage} />
				<FixedButton
					text={{ default: 'Відправити', loading: 'Зупинити' }}
					isDisabled={postChatState.isLoading}
					isActive={true}
					onClick={sendMessage}
				/>
			</div>
		</>
	)
}
