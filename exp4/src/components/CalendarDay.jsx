import React, { memo, useCallback } from "react";
import PostCard from "./PostCard";

const CalendarDay = ({
  day,
  date,
  posts,
  onDropPost,
  onDragStart,
  onDragOverDate,
  onPostRender,
  mode,
}) => {
  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();

      // Only non-optimized mode updates state
      onDragOverDate(date);
    },
    [date, onDragOverDate]
  );

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
    // Non-optimized:
    // Always re-render.
    if (nextProps.mode === "non-optimized") {
      return false;
    }

    // Optimized:
    // Skip render if props have not changed.
    return (
      previousProps.day === nextProps.day &&
      previousProps.date === nextProps.date &&
      previousProps.posts === nextProps.posts &&
      previousProps.onDropPost === nextProps.onDropPost &&
      previousProps.onDragStart === nextProps.onDragStart &&
      previousProps.onDragOverDate ===
        nextProps.onDragOverDate &&
      previousProps.onPostRender ===
        nextProps.onPostRender &&
      previousProps.mode === nextProps.mode
    );
  }
);

export default MemoizedCalendarDay;