import "./styles.css";

export default function Loading() {
  return (
    <div className="loading-area custom-scrollbar">
      <div className="loader">
        <div className="spinner" />
      </div>
    </div>
  );
}