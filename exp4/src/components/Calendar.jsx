import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import CalendarDay from "./CalendarDay";

const Calendar = ({
  posts,
  onPostsChange,
  mode,
  onCalendarRender,
  onPostRender,
}) => {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(2026, 7, 1)
  );

  // Monitor Calendar rendering
  useEffect(() => {
    onCalendarRender();
  }, [onCalendarRender, posts, currentMonth, mode]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Generate calendar dates
  const dates = useMemo(() => {
    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;

      return {
        day,
        date: `${year}-${String(month + 1).padStart(
          2,
          "0"
        )}-${String(day).padStart(2, "0")}`,
      };
    });
  }, [year, month]);

  // Group posts by date
  const postsByDate = useMemo(() => {
    const groupedPosts = {};

    posts.forEach((post) => {
      if (!groupedPosts[post.date]) {
        groupedPosts[post.date] = [];
      }

      groupedPosts[post.date].push(post);
    });

    return groupedPosts;
  }, [posts]);

  // Change month
  const changeMonth = useCallback(
    (direction) => {
      setCurrentMonth(
        new Date(year, month + direction, 1)
      );
    },
    [year, month]
  );

  // Handle drag start
  const handleDragStart = useCallback((e, postId) => {
    e.dataTransfer.setData(
      "postId",
      String(postId)
    );
  }, []);

  // Move post to another date
  const handleDropPost = useCallback(
    (postId, newDate) => {
      const updatedPosts = posts.map((post) =>
        post.id === postId
          ? { ...post, date: newDate }
          : post
      );

      onPostsChange(updatedPosts);
    },
    [posts, onPostsChange]
  );

  return (
    <section className="calendar-section">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>
          ‹
        </button>

        <h2>
          {currentMonth.toLocaleString("default", {
            month: "long",
          })}{" "}
          {year}
        </h2>

        <button onClick={() => changeMonth(1)}>
          ›
        </button>
      </div>

      <div className="weekdays">
        {[
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {dates.map(({ day, date }) => (
          <CalendarDay
            key={date}
            day={day}
            date={date}
            posts={postsByDate[date] || []}
            onDropPost={handleDropPost}
            onDragStart={handleDragStart}
            onPostRender={onPostRender}
            mode={mode}
          />
        ))}
      </div>
    </section>
  );
};

export default Calendar;