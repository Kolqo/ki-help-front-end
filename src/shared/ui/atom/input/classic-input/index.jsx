import { forwardRef } from "react";
import "./styles.css";

const Input = forwardRef((props, ref) => {
    return (
			<div className='classic-input-wrapper'>
				<input
					ref={ref}
					className={`class-input ${props.className ? props.className : ''}`}
					placeholder={props.placeholder}
					onKeyDown={props.onKeyDown}
					onChange={props.onChange}
				/>
			</div>
		)
  }
);

export default Input;
