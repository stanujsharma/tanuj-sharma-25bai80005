
import React, { useEffect, useState } from 'react';
import './App.css';

const API = 'http://localhost:8080';

function App() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('DevOps Lead');
  const [loading, setLoading] = useState(false);
  const [canary, setCanary] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [pipeline, setPipeline] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API}/api/posts`);
      if (!response.ok) throw new Error('Unable to fetch posts');
      setPosts(await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDashboard = async () => {
    try {
      const [config, metricData, pipelineData] = await Promise.all([
        fetch(`${API}/api/canary/config`),
        fetch(`${API}/api/canary/metrics`),
        fetch(`${API}/api/pipeline/status`)
      ]);

      if (config.ok) setCanary(await config.json());
      if (metricData.ok) setMetrics(await metricData.json());
      if (pipelineData.ok) setPipeline(await pipelineData.json());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchDashboard();
  }, []);

  const createPost = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Please enter title and content');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          author,
          version: 'v1.0.0',
          likes: 0
        })
      });

      if (!response.ok) throw new Error('Post creation failed');

      setTitle('');
      setContent('');
      await fetchPosts();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`${API}/api/posts/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Delete failed');
      await fetchPosts();
    } catch (error) {
      alert(error.message);
    }
  };

  const updateCanary = async (percentage) => {
    try {
      const response = await fetch(
        `${API}/api/canary/config?percentage=${percentage}`,
        { method: 'PUT' }
      );

      if (!response.ok) throw new Error('Canary update failed');

      setCanary(await response.json());
      await fetchDashboard();
    } catch (error) {
      alert(error.message);
    }
  };

  const routeTraffic = async () => {
    try {
      const response = await fetch(`${API}/api/canary/route`);
      if (!response.ok) throw new Error('Traffic routing failed');

      const result = await response.json();
      alert(`Traffic routed to: ${result.version}`);
      await fetchDashboard();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-icon">⚡</span>
          <div>
            <h2>DevFlow</h2>
            <p>CI/CD CONTROL CENTER</p>
          </div>
        </div>
        <span className="live-status">● SYSTEM ONLINE</span>
      </header>

      <main className="container">
        <section className="hero">
          <span className="eyebrow">DEVOPS DASHBOARD / EXPERIMENT 09</span>
          <h1>Build. Test. <span>Deploy.</span></h1>
          <p>Automated CI/CD pipeline with intelligent canary deployment.</p>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <span>Total Posts</span>
            <h2>{posts.length}</h2>
            <small>Database records</small>
          </div>

          <div className="stat-card">
            <span>Canary Traffic</span>
            <h2>{canary?.canaryPercentage ?? 20}%</h2>
            <small>Experimental deployment</small>
          </div>

          <div className="stat-card">
            <span>Stable Hits</span>
            <h2>{metrics?.stableHits ?? 0}</h2>
            <small>Production traffic</small>
          </div>

          <div className="stat-card">
            <span>Canary Hits</span>
            <h2>{metrics?.canaryHits ?? 0}</h2>
            <small>Canary traffic</small>
          </div>
        </section>

        <section className="panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">DEPLOYMENT CONTROL</span>
              <h2>Canary Deployment</h2>
            </div>
            <span className="status-pill">ACTIVE</span>
          </div>

          <p className="description">
            Control the percentage of traffic sent to the new version.
          </p>

          <div className="canary-control">
            <strong>Canary Percentage</strong>
            <h2>{canary?.canaryPercentage ?? 20}%</h2>
            <input
              type="range"
              min="0"
              max="100"
              value={canary?.canaryPercentage ?? 20}
              onChange={(e) => updateCanary(Number(e.target.value))}
            />
            <div className="range-labels">
              <span>0% Stable</span>
              <span>100% Canary</span>
            </div>
            <button className="primary-btn" onClick={routeTraffic}>
              ⚡ Route Test Traffic
            </button>
          </div>
        </section>

        <section className="panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">AUTOMATION</span>
              <h2>Pipeline Status</h2>
            </div>
            <span className="status-pill">
              {pipeline?.status ?? 'CHECKING'}
            </span>
          </div>

          <div className="pipeline-grid">
            <div className="pipeline-step">
              <span>01</span>
              <h3>Build</h3>
              <p>{pipeline?.build ?? 'Waiting'}</p>
            </div>
            <div className="pipeline-step">
              <span>02</span>
              <h3>Testing</h3>
              <p>{pipeline?.tests ?? 'Waiting'}</p>
            </div>
            <div className="pipeline-step">
              <span>03</span>
              <h3>Deployment</h3>
              <p>{pipeline?.deployment ?? 'Waiting'}</p>
            </div>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel create-panel">
            <span className="eyebrow">CONTENT MANAGEMENT</span>
            <h2>Create New Post</h2>

            <form onSubmit={createPost}>
              <label>Post Title</label>
              <input
                type="text"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label>Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />

              <label>Post Content</label>
              <textarea
                placeholder="Write something..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="5"
              />

              <button className="primary-btn" disabled={loading}>
                {loading ? 'Creating...' : '+ Create Post'}
              </button>
            </form>
          </div>

          <div className="panel posts-panel">
            <div className="section-heading">
              <div>
                <span className="eyebrow">DATABASE</span>
                <h2>Published Posts</h2>
              </div>
              <button className="refresh-btn" onClick={fetchPosts}>
                ↻ Refresh
              </button>
            </div>

            {posts.length === 0 ? (
              <p className="empty-state">No posts available yet.</p>
            ) : (
              <div className="posts-list">
                {posts.map((post) => (
                  <article className="post-card" key={post.id}>
                    <div className="post-top">
                      <span className="version-tag">
                        {post.version || 'v1.0.0'}
                      </span>
                      <button
                        className="delete-btn"
                        onClick={() => deletePost(post.id)}
                      >
                        Delete
                      </button>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <small>
                      {post.author} · {post.likes ?? 0} likes
                    </small>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <footer>
          <p>DevFlow © 2026 · CI/CD Automation Dashboard</p>
          <span>Powered by React + Spring Boot</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
