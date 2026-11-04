import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const API_URL = 'http://localhost:8080/api/posts';

  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Unable to fetch posts');
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setMessage('Backend connection failed. Please check the server.');
    }
  };

  useEffect(() => {
    fetchPosts();

    const interval = setInterval(fetchPosts, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSchedule = async (e) => {
    e.preventDefault();

    if (!content.trim() || !scheduleTime) {
      setMessage('Please enter post content and schedule time.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: content,
          scheduledTime: scheduleTime
        })
      });

      if (!response.ok) {
        throw new Error('Failed to schedule post');
      }

      setContent('');
      setScheduleTime('');
      setMessage('Post scheduled successfully! 🎉');

      fetchPosts();
    } catch (error) {
      console.error('Scheduling error:', error);
      setMessage('Unable to schedule post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'PUBLISHED':
        return 'published';
      case 'PUBLISHING':
        return 'publishing';
      case 'FAILED':
        return 'failed';
      default:
        return 'pending';
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">⚡</div>
        <div>
          <h1>Post Publisher</h1>
          <p>Kafka Event-Driven Scheduling System</p>
        </div>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2>Schedule a New Post</h2>
          <p className="section-description">
            Create a post and choose when it should be published.
          </p>

          <form onSubmit={handleSchedule}>
            <label htmlFor="content">Post Content</label>

            <textarea
              id="content"
              placeholder="Write something amazing..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="5"
              required
            />

            <label htmlFor="scheduleTime">Schedule Date & Time</label>

            <input
              id="scheduleTime"
              type="datetime-local"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Scheduling...' : '⚡ Schedule Post'}
            </button>
          </form>

          {message && (
            <p className="message">{message}</p>
          )}
        </section>

        <section className="posts-section">
          <div className="posts-heading">
            <div>
              <h2>Scheduled Posts</h2>
              <p className="section-description">
                Monitor your post publishing activity.
              </p>
            </div>

            <button
              className="refresh-button"
              type="button"
              onClick={fetchPosts}
            >
              ↻ Refresh
            </button>
          </div>

          <div className="posts-list">
            {posts.length === 0 ? (
              <div className="empty-state">
                <span>📭</span>
                <h3>No posts yet</h3>
                <p>Your scheduled posts will appear here.</p>
              </div>
            ) : (
              posts.map((post) => (
                <div className="post-card" key={post.id}>
                  <div className="post-card-top">
                    <span className="post-id">
                      Post #{post.id}
                    </span>

                    <span className={`status ${getStatusClass(post.status)}`}>
                      {post.status}
                    </span>
                  </div>

                  <p className="post-content">{post.content}</p>

                  <div className="post-time">
                    🕒 Scheduled: {post.scheduledTime}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        Powered by React, Spring Boot, Kafka and H2 Database
      </footer>
    </div>
  );
}

export default App;