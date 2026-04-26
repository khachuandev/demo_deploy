import "../styles/UserTable.css";

export default function UserTable({ users, onEdit, onDelete, isLoading }) {
  if (isLoading) {
    return <div className="loading">Loading users...</div>;
  }

  if (users.length === 0) {
    return (
      <div className="empty-state">
        No users found. Click "Add New User" to get started.
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.description || "-"}</td>
              <td className="actions">
                <button
                  className="btn btn-sm btn-edit"
                  onClick={() => onEdit(user)}
                  title="Edit user"
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-sm btn-delete"
                  onClick={() => onDelete(user.id)}
                  title="Delete user"
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
