import React, {
  memo,
  useCallback,
  useEffect,
} from "react";

const PostCard = ({
  post,
  onDragStart,
  onPostRender,
  mode,
}) => {
  // Monitor PostCard rendering
  useEffect(() => {
    onPostRender();
  }, [onPostRender]);

  // Handle drag start
  const handleDragStart = useCallback(
    (e) => {
      e.dataTransfer.setData(
        "postId",
        String(post.id)
      );

      onDragStart(e, post.id);
    },
    [post.id, onDragStart]
  );

  return (
    <div
      className="post-card"
      draggable
      onDragStart={handleDragStart}
    >
      <div className="post-title">
        {post.title}
      </div>

      <div className="post-platform">
        {post.platform}
      </div>
    </div>
  );
};

const MemoizedPostCard = memo(
  PostCard,
  (previousProps, nextProps) => {
    // Non-optimized mode:
    // Always allow re-rendering.
    if (nextProps.mode === "non-optimized") {
      return false;
    }

    // Optimized mode:
    // Re-render only when required props change.
    return (
      previousProps.post === nextProps.post &&
      previousProps.onDragStart === nextProps.onDragStart &&
      previousProps.onPostRender === nextProps.onPostRender &&
      previousProps.mode === nextProps.mode
    );
  }
);

export default MemoizedPostCard;
