import "./styles.css";

export default function LoadingSubject(props) {
  return (
    <>
			{Array.from({ length: props.count }).map((_, index) => (
				<div key={index} className='color-box' />
			))}
    </>
  );
}
