import { forwardRef, useLayoutEffect, useRef } from "react";
import "./styles.css";

const autosize = el => {
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

const Input = forwardRef((props, ref) => {
    const localRef = useRef(null)

    const setRefs = el => {
      localRef.current = el
      if (typeof ref === 'function') ref(el)
      else if (ref) ref.current = el
    }

    useLayoutEffect(() => {
      if (props.multiline) autosize(localRef.current)
    })

    if (props.multiline) {
      return (
        <div className='classic-input-wrapper'>
          <textarea
            ref={setRefs}
            className={`class-input class-textarea ${props.className ? props.className : ''}`}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            onKeyDown={props.onKeyDown}
            onChange={e => {
              autosize(e.target)
              props.onChange?.(e)
            }}
            rows={1}
          />
        </div>
      )
    }

    return (
			<div className='classic-input-wrapper'>
				<input
					ref={ref}
					className={`class-input ${props.className ? props.className : ''}`}
					placeholder={props.placeholder}
					defaultValue={props.defaultValue}
					onKeyDown={props.onKeyDown}
					onChange={props.onChange}
				/>
			</div>
		)
  }
);

export default Input;
