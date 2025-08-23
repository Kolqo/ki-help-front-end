import "./styles.css";

export default function LoadingTransaction(props) {
  return (
    <>
			{Array.from({ length: props.count }).map((_, index) => (
				<div key={index} className='color-box' />
			))}
    </>
  );
}
