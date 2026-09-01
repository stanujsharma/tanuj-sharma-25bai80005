import React, { memo, useCallback } from "react";
import PostCard from "./PostCard";

const CalendarDay = ({
  day,
  date,
  posts,
  onDropPost,
  onDragStart,
  onPostRender,
  mode,
}) => {
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();

      const postId = Number(
        e.dataTransfer.getData("postId")
      );

      if (postId) {
        onDropPost(postId, date);
      }
    },
    [onDropPost, date]
  );

  return (
    <div
      className="calendar-day"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="day-number">{day}</div>

      <div className="day-posts">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDragStart={onDragStart}
            onPostRender={onPostRender}
            mode={mode}
          />
        ))}
      </div>
    </div>
  );
};

const MemoizedCalendarDay = memo(
  CalendarDay,
  (previousProps, nextProps) => {
    // Non-optimized mode:
    // Always allow re-rendering.
    if (nextProps.mode === "non-optimized") {
      return false;
    }

    // Optimized mode:
    // Re-render only when required props change.
    return (
      previousProps.day === nextProps.day &&
      previousProps.date === nextProps.date &&
      previousProps.posts === nextProps.posts &&
      previousProps.onDropPost === nextProps.onDropPost &&
      previousProps.onDragStart === nextProps.onDragStart &&
      previousProps.onPostRender === nextProps.onPostRender &&
      previousProps.mode === nextProps.mode
    );
  }
);

export default MemoizedCalendarDay;