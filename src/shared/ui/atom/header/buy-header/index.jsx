import "./styles.css";

export default function BuyHeader(props) {
  return (
    <>
      <div className="buy-header-area">
        <div>{props.name}</div>
        <div>{props.children}</div>
      </div>
    </>
  );
}
