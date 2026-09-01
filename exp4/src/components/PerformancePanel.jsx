import React from "react";

const PerformancePanel = ({
  mode,
  setMode,
  calendarRenders,
  postRenders,
  eventCalculations,
}) => {
  const isOptimized = mode === "optimized";

  return (
    <aside className="performance-panel">
      <div className="panel-heading">
        <span>Performance</span>
        <span className="monitor-dot"></span>
      </div>

      <div className="mode-buttons">
        <button
          className={isOptimized ? "active" : ""}
          onClick={() => setMode("optimized")}
        >
          Optimized
        </button>

        <button
          className={!isOptimized ? "active" : ""}
          onClick={() => setMode("non-optimized")}
        >
          Non-Optimized
        </button>
      </div>

      <div className="performance-status">
        <h3>
          {isOptimized
            ? "Optimized Rendering"
            : "Non-Optimized Rendering"}
        </h3>

        <p>
          {isOptimized
            ? "React.memo, useMemo and useCallback are used to reduce unnecessary rendering."
            : "Components are allowed to re-render without memoization optimization."}
        </p>
      </div>

      <div className="metric-list">
        <div className="metric-card">
          <span>Calendar Renders</span>
          <strong>{calendarRenders}</strong>
        </div>

        <div className="metric-card">
          <span>Post Renders</span>
          <strong>{postRenders}</strong>
        </div>

        <div className="metric-card">
          <span>Event Calculations</span>
          <strong>{eventCalculations}</strong>
        </div>
      </div>

      <div className="optimization-info">
        <h3>Techniques</h3>

        <div>
          <span>React.memo</span>
          <b>{isOptimized ? "ON" : "OFF"}</b>
        </div>

        <div>
          <span>useMemo</span>
          <b>{isOptimized ? "ON" : "OFF"}</b>
        </div>

        <div>
          <span>useCallback</span>
          <b>{isOptimized ? "ON" : "OFF"}</b>
        </div>
      </div>
    </aside>
  );
};

export default PerformancePanel;
