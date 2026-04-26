import { useState, useEffect } from "react";
import userService from "../api/userService";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import "../styles/UserManagement.css";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      showMessage("error", "Failed to load users");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userService.deleteUser(id);
        setUsers(users.filter((u) => u.id !== id));
        showMessage("success", "User deleted successfully");
      } catch (error) {
        showMessage("error", "Failed to delete user");
        console.error(error);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedUser) {
        // Update existing user
        const updatedUser = await userService.updateUser(
          selectedUser.id,
          formData,
        );
        setUsers(
          users.map((u) => (u.id === selectedUser.id ? updatedUser : u)),
        );
        showMessage("success", "User updated successfully");
      } else {
        // Create new user
        const newUser = await userService.createUser(formData);
        setUsers([...users, newUser]);
        showMessage("success", "User created successfully");
      }
      setShowForm(false);
      setSelectedUser(null);
    } catch (error) {
      showMessage(
        "error",
        selectedUser ? "Failed to update user" : "Failed to create user",
      );
      console.error(error);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  return (
    <div className="user-management">
      <div className="header">
        <h1>User Management</h1>
        <button className="btn btn-primary btn-lg" onClick={handleAddUser}>
          ➕ Add New User
        </button>
      </div>

      {message.text && (
        <div className={`message message-${message.type}`}>{message.text}</div>
      )}

      <UserTable
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        isLoading={isLoading}
      />

      {showForm && (
        <UserForm
          user={selectedUser}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
}
