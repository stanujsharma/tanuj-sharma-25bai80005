
import {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";

import Calendar from "./components/Calendar";
import PerformancePanel from "./components/PerformancePanel";
import postsData from "./data/posts";
import "./App.css";

function App() {
  const [posts, setPosts] = useState(postsData);
  const [mode, setMode] = useState("optimized");

  const [calendarRenders, setCalendarRenders] = useState(0);
  const [postRenders, setPostRenders] = useState(0);
  const [eventCalculations, setEventCalculations] = useState(0);

  // App render counter
  const renderRef = useRef(0);
  renderRef.current += 1;

  // Calendar render monitoring
  const handleCalendarRender = useCallback(() => {
    setCalendarRenders((count) => count + 1);
  }, []);

  // Post render monitoring
  const handlePostRender = useCallback(() => {
    setPostRenders((count) => count + 1);
  }, []);

  // Calculate scheduled posts
  const scheduledPosts = useMemo(() => {
    return posts.filter((post) => post.date);
  }, [posts]);

  // Count event calculations when posts change
  useEffect(() => {
    setEventCalculations((count) => count + 1);
  }, [posts]);

  // Stable function for updating posts
  const handlePostsChange = useCallback((updatedPosts) => {
    setPosts(updatedPosts);
  }, []);

  return (
    <div className="app">
      <header className="top-header">
        <div>

          <h1>Social Media Scheduler</h1>

          <p className="subtitle">
            Drag posts between dates and observe React rendering.
          </p>
        </div>

        <div className="post-summary">
          <span>Scheduled Posts</span>
          <strong>{scheduledPosts.length}</strong>
        </div>
      </header>

      <main className="workspace">
        <div className="calendar-area">
          <Calendar
            posts={posts}
            onPostsChange={handlePostsChange}
            mode={mode}
            onCalendarRender={handleCalendarRender}
            onPostRender={handlePostRender}
          />
        </div>

        <PerformancePanel
          mode={mode}
          setMode={setMode}
          calendarRenders={calendarRenders}
          postRenders={postRenders}
          eventCalculations={eventCalculations}
        />
      </main>

      <footer className="footer">
        <span>Current Mode:</span>

        <strong>
          {mode === "optimized"
            ? " Optimized"
            : " Non-Optimized"}
        </strong>

        <span className="footer-count">
          App Render Count: {renderRef.current}
        </span>
      </footer>
    </div>
  );
}

export default App;
