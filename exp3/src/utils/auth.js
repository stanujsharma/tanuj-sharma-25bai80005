import { jwtDecode } from "jwt-decode";
import usersData from "../data/users";

// Get users from localStorage
const getUsers = () => {
  const savedUsers = localStorage.getItem("rbac_users");

  if (savedUsers) {
    return JSON.parse(savedUsers);
  }

  return usersData;
};

// Generate mock JWT
export const generateToken = (user) => {
  const header = btoa(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT",
    })
  );

  const payload = btoa(
    JSON.stringify({
      username: user.username,
      role: user.role,
      iat: Date.now(),
    })
  );

  const signature = btoa("mock-signature");

  return `${header}.${payload}.${signature}`;
};

// Login using current saved users
export const loginUser = (username, password) => {
  const users = getUsers();

  const user = users.find(
    (item) =>
      item.username === username &&
      item.password === password
  );

  if (!user) {
    return null;
  }

  const token = generateToken(user);

  localStorage.setItem("token", token);

  return token;
};

// Get stored token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Decode JWT
export const getUserFromToken = () => {
  const token = getToken();

  if (!token) {
    return null;
  }

  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(atob(parts[1]));

    return payload;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
};

// Check authentication
export const isAuthenticated = () => {
  return getUserFromToken() !== null;
};