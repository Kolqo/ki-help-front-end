import './styles.css'
import './markdown.css'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css'

import { useEffect } from 'react'

import { ScrollTopButton } from '../../../../../shared/ui'

export default function ChatArea(props) {
	useEffect(() => {
		const container = document.querySelector('.style-chat-area')
		if (container) {
			container.scrollTo({
				top: container.scrollHeight,
				behavior: 'smooth',
			})
		}
	}, [props.messages])

	const UserMessage = ({ message }) => (
		<div className='message-box user-box'>
			<div className='message user-message'>{message}</div>
		</div>
	)

	const AiMessage = ({ message }) => (
		<div className='message-box ai-box'>
			<div className='message ai-message'>
				{typeof message === 'string' ? (
					<ReactMarkdown
						remarkPlugins={[remarkGfm, remarkBreaks]}
						rehypePlugins={[rehypeHighlight]}
						components={{
							ul: ({ children, ...props }) => (
								<ul className='markdown-ul' {...props}>
									{children}
								</ul>
							),
							ol: ({ children, ...props }) => (
								<ol className='markdown-ol' {...props}>
									{children}
								</ol>
							),
							li: ({ children, ...props }) => (
								<li className='markdown-li' {...props}>
									{children}
								</li>
							),
							p: ({ children, ...props }) => (
								<p className='markdown-p' {...props}>
									{children}
								</p>
							),
							h1: ({ children, ...props }) => (
								<h1 className='markdown-h1' {...props}>
									{children}
								</h1>
							),
							h2: ({ children, ...props }) => (
								<h2 className='markdown-h2' {...props}>
									{children}
								</h2>
							),
							h3: ({ children, ...props }) => (
								<h3 className='markdown-h3' {...props}>
									{children}
								</h3>
							),
							blockquote: ({ children, ...props }) => (
								<blockquote className='markdown-blockquote' {...props}>
									{children}
								</blockquote>
							),
							code: ({ children, className, ...props }) => {
								const isInline = !className?.includes('language-')
								return isInline ? (
									<code className='markdown-code-inline' {...props}>
										{children}
									</code>
								) : (
									<code
										className={`markdown-code-block ${className || ''}`}
										{...props}
									>
										{children}
									</code>
								)
							},
							pre: ({ children, ...props }) => (
								<pre className='markdown-pre' {...props}>
									{children}
								</pre>
							),
							strong: ({ children, ...props }) => (
								<strong className='markdown-strong' {...props}>
									{children}
								</strong>
							),
							em: ({ children, ...props }) => (
								<em className='markdown-em' {...props}>
									{children}
								</em>
							),
							table: ({ children, ...props }) => (
								<table className='markdown-table' {...props}>
									{children}
								</table>
							),
							thead: ({ children, ...props }) => (
								<thead className='markdown-thead' {...props}>
									{children}
								</thead>
							),
							tbody: ({ children, ...props }) => (
								<tbody className='markdown-tbody' {...props}>
									{children}
								</tbody>
							),
							th: ({ children, ...props }) => (
								<th className='markdown-th' {...props}>
									{children}
								</th>
							),
							td: ({ children, ...props }) => (
								<td className='markdown-td' {...props}>
									{children}
								</td>
							),
						}}
					>
						{message}
					</ReactMarkdown>
				) : (
					message
				)}
			</div>
		</div>
	)

	const SuggestMessages = ({ setValue, onSend }) => (
		<div className='suggest-messages-box'>
			Спробувати ці
			<div
				className='suggest-message'
				onClick={() => {
					setValue('Як запустити програму?')
				}}
			>
				Як запустити програму?
			</div>
			<div
				className='suggest-message'
				onClick={() => {
					setValue('Розкажи коротко про завдання')
				}}
			>
				Розкажи коротко про завдання
			</div>
		</div>
	)

	return (
		<>
			<ScrollTopButton
				containerRef='.style-chat-area'
				mode='bottom'
				bottom='200'
			/>
			<div className='style-chat-area'>
				{props.messages.length === 0 && (
					<SuggestMessages setValue={props.setValue} />
				)}
				{props.messages.map((m, i) =>
					m.role === 'USER' ? (
						<UserMessage key={i} message={m.content} />
					) : (
						<AiMessage key={i} message={m.content} />
					)
				)}
			</div>
		</>
	)
}
