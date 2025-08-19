import "./styles.css";

export default function LoadingTask(props) {
  const tasks = Array.from({ length: props.count }, (_, index) => (
    <div key={index} className="loading-tasks">
      <div className="task-header">
        <div className="task-header-left">
          <div className="task-header-left-box1"/>
          <div className="task-header-left-box2"/>
        </div>
        <div className="task-header-right">
          <div className="task-header-right-box"/>
        </div>
      </div>
      <div className="task-bottom">
        <div className="task-bottom-box1"/>
        <div className="task-bottom-box2"/>
      </div>
    </div>
  ));

  return (
    <div className={`style-loading-task ${props.className || ""}`}>
      {tasks}
    </div>
  );
}