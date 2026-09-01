import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import usersData from "../data/users";

const Admin = () => {
  const { user } = useAuth();

  // Load users from localStorage
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("rbac_users");

    return savedUsers ? JSON.parse(savedUsers) : usersData;
  });

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("Viewer");

  // Save users whenever users change
  useEffect(() => {
    localStorage.setItem("rbac_users", JSON.stringify(users));
  }, [users]);

  // Add User
  const addUser = () => {
    if (!newUsername.trim() || !newPassword.trim()) {
      alert("Please enter username and password.");
      return;
    }

    const usernameExists = users.some(
      (item) =>
        item.username.toLowerCase() ===
        newUsername.trim().toLowerCase()
    );

    if (usernameExists) {
      alert("Username already exists.");
      return;
    }

    const newUser = {
      id: Date.now(),
      username: newUsername.trim(),
      password: newPassword,
      role: newRole,
    };

    setUsers((currentUsers) => [
      ...currentUsers,
      newUser,
    ]);

    setNewUsername("");
    setNewPassword("");
    setNewRole("Viewer");

    alert("User added successfully.");
  };

  // Edit User
  const editUser = (id) => {
    const selectedUser = users.find(
      (item) => item.id === id
    );

    if (!selectedUser) {
      return;
    }

    const updatedUsername = prompt(
      "Enter new username:",
      selectedUser.username
    );

    if (!updatedUsername || !updatedUsername.trim()) {
      return;
    }

    const usernameExists = users.some(
      (item) =>
        item.id !== id &&
        item.username.toLowerCase() ===
          updatedUsername.trim().toLowerCase()
    );

    if (usernameExists) {
      alert("Username already exists.");
      return;
    }

    setUsers((currentUsers) =>
      currentUsers.map((item) =>
        item.id === id
          ? {
              ...item,
              username: updatedUsername.trim(),
            }
          : item
      )
    );

    alert("User updated successfully.");
  };

  // Delete User
  const deleteUser = (id) => {
    const selectedUser = users.find(
      (item) => item.id === id
    );

    if (!selectedUser) {
      return;
    }

    if (selectedUser.username === user.username) {
      alert("You cannot delete your own account.");
      return;
    }

    if (
      window.confirm(
        `Delete user "${selectedUser.username}"?`
      )
    ) {
      setUsers((currentUsers) =>
        currentUsers.filter((item) => item.id !== id)
      );

      alert("User deleted successfully.");
    }
  };

  return (
    <div className="page-container">
      <h1>Admin Panel</h1>

      <p>
        Welcome, <strong>{user.username}</strong>.
      </p>

      <p>
        You have <strong>Admin</strong> permissions.
      </p>

      {/* Add User */}
      <div className="role-card">
        <h2>Manage Users</h2>

        <div className="add-user-form">
          <input
            type="text"
            placeholder="Username"
            value={newUsername}
            onChange={(e) =>
              setNewUsername(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />

          <select
            value={newRole}
            onChange={(e) =>
              setNewRole(e.target.value)
            }
          >
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>

          <button onClick={addUser}>
            Add User
          </button>
        </div>
      </div>

      {/* User List */}
      <div className="role-card">
        <h2>User List</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.role}</td>

                <td>
                  <button
                    onClick={() =>
                      editUser(item.id)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteUser(item.id)
                    }
                    disabled={
                      item.username === user.username
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Permissions */}
      <div className="role-card">
        <h2>Admin Permissions</h2>

        <ul>
          <li>Manage users</li>
          <li>Add users</li>
          <li>Edit users</li>
          <li>Delete users</li>
          <li>Manage application settings</li>
          <li>Create, edit and delete content</li>
          <li>View all application data</li>
        </ul>
      </div>
    </div>
  );
};

export default Admin;