import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import initialContent from "../data/content";

const Editor = () => {
  const { user } = useAuth();

  // Load saved content
  const [content, setContent] = useState(() => {
    const savedContent =
      localStorage.getItem("rbac_content");

    return savedContent
      ? JSON.parse(savedContent)
      : initialContent;
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  // Save content whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "rbac_content",
      JSON.stringify(content)
    );
  }, [content]);

  // Add new content
  const addContent = () => {
    if (!title.trim() || !description.trim()) {
      alert("Please enter title and description.");
      return;
    }

    const newContent = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
    };

    setContent((currentContent) => [
      ...currentContent,
      newContent,
    ]);

    setTitle("");
    setDescription("");

    alert("Content added successfully.");
  };

  // Start editing
  const startEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Update existing content
  const updateContent = () => {
    if (!title.trim() || !description.trim()) {
      alert("Please enter title and description.");
      return;
    }

    setContent((currentContent) =>
      currentContent.map((item) =>
        item.id === editingId
          ? {
              ...item,
              title: title.trim(),
              description: description.trim(),
            }
          : item
      )
    );

    setEditingId(null);
    setTitle("");
    setDescription("");

    alert("Content updated successfully.");
  };

  // Delete content
  const deleteContent = (id) => {
    const selectedContent = content.find(
      (item) => item.id === id
    );

    if (
      window.confirm(
        `Delete "${selectedContent?.title}"?`
      )
    ) {
      setContent((currentContent) =>
        currentContent.filter(
          (item) => item.id !== id
        )
      );

      alert("Content deleted successfully.");
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="page-container">
      <h1>Editor Panel</h1>

      <p>
        Welcome, <strong>{user.username}</strong>.
      </p>

      <p>
        You have <strong>Editor</strong> permissions.
      </p>

      {/* Add / Edit Content */}
      <div className="role-card">
        <h2>
          {editingId
            ? "Edit Existing Content"
            : "Add New Content"}
        </h2>

        <input
          type="text"
          placeholder="Enter content title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <br />
        <br />

        <textarea
          placeholder="Enter content description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          rows="4"
        />

        <br />
        <br />

        {editingId ? (
          <>
            <button onClick={updateContent}>
              Update Content
            </button>

            <button onClick={cancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={addContent}>
            Add New Content
          </button>
        )}
      </div>

      {/* Existing Content */}
      <div className="role-card">
        <h2>Existing Content</h2>

        {content.length === 0 ? (
          <p>No content available.</p>
        ) : (
          content.map((item) => (
            <div
              className="content-item"
              key={item.id}
            >
              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <button
                onClick={() => startEdit(item)}
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteContent(item.id)
                }
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Permissions */}
      <div className="role-card">
        <h2>Editor Permissions</h2>

        <ul>
          <li>View existing content</li>
          <li>Add new content</li>
          <li>Edit existing content</li>
          <li>Delete assigned content</li>
        </ul>
      </div>
    </div>
  );
};

export default Editor;