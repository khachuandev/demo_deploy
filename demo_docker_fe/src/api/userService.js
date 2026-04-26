const API_BASE_URL = "/api/v1/users";

const userService = {
  // Get all users
  getUsers: async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  // Create new user
  createUser: async (userData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error("Failed to create user");
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error("Failed to update user");
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user");
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
};

export default userService;
