import "./styles.css";

import { Tgs } from "../../../shared/ui";

export default function NewsItem(props) {
  return (
		<>
			<div
				className='class-news-item'
				style={{
					background: `linear-gradient(to bottom, ${props.newsItem.firstColor}, ${props.newsItem.secondColor})`,
				}}
			>
				<div className='news-info'>
					<p>{props.newsItem.title}</p>
					<span>{props.newsItem.text}</span>
					<link></link>
				</div>
				<Tgs src={props.newsItem.tgs} isLoop isAutoplay></Tgs>
			</div>
		</>
	)
}