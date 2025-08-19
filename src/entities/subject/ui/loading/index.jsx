import "./styles.css";

export default function LoadingSubject(props) {
  return (
    <>
      <div className={`style-loading-subject ${props.className || ""}`}>
        <div className="color-box"/>
        <div className="color-box"/>
        <div className="color-box"/>
      </div>
    </>
  );
}
