import "./styles.css";

export default function LoadingItem(props) {
  return (
    <>
			{Array.from({ length: props.count }).map((_, index) => (
				<div key={index} style={{height: `${props.height}px`}} className='color-box' />
			))}
    </>
  );
}
