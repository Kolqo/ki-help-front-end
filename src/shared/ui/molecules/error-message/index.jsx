import "./styles.css";

import { ErrorIcon } from "../../../assets/svg";

export default function ErrorMessage(props) {

  return (
		<>
			{props.errors
				.filter(error => error.isError)
				.map((error, index) => (
					<div className='error-area' key={index}>
						<ErrorIcon />
						{error.errorMessage}
					</div>
				))}
		</>
	)
}
