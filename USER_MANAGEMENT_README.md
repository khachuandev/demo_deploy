# User Management System

## Overview

This is a full-stack application with a Spring Boot backend and React frontend for managing users.

### Backend (Spring Boot)

- **Location**: `DemoDocker/`
- **Database**: MySQL (localhost:3306, demo_docker database)
- **Port**: 8080
- **API Base URL**: `http://localhost:8080/api/v1/users`

#### Completed Features:

- ✅ Get all users (GET /api/v1/users)
- ✅ Get user by ID (GET /api/v1/users/{id})
- ✅ Create user (POST /api/v1/users)
- ✅ Update user (PUT /api/v1/users/{id})
- ✅ Delete user (DELETE /api/v1/users/{id}) - _Added_
- ✅ Fixed: addUser now saves to database

#### User Entity:

```
- id (Long, Primary Key)
- username (String)
- email (String)
- description (String)
- createdAt (Instant)
- updatedAt (Instant)
```

### Frontend (React + Vite)

- **Location**: `demo_docker_fe/`
- **Port**: 5173 (default Vite port)

#### Files Created:

1. **API Service** (`src/api/userService.js`)
   - Handles all HTTP calls to backend
   - Methods: getUsers, getUserById, createUser, updateUser, deleteUser

2. **Components**:
   - `UserManagement.jsx` - Main container component with state management
   - `UserTable.jsx` - Displays users in a table format
   - `UserForm.jsx` - Form for adding/editing users with validation

3. **Styles** (CSS):
   - `styles/UserManagement.css` - Main container styles
   - `styles/UserTable.css` - Table and action buttons
   - `styles/UserForm.css` - Modal form styles

#### Features:

- ✅ View all users in a table
- ✅ Add new user with form validation
- ✅ Edit existing user
- ✅ Delete user with confirmation
- ✅ Error and success messages
- ✅ Loading states
- ✅ Responsive design (works on mobile/tablet)
- ✅ Email validation

## Setup Instructions

### Backend Setup:

1. Make sure MySQL is running with database `demo_docker`
2. Navigate to `DemoDocker/` directory
3. Run: `mvn spring-boot:run`
4. Backend will start on http://localhost:8080

### Frontend Setup:

1. Navigate to `demo_docker_fe/` directory
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Frontend will run on http://localhost:5173

## Testing the Application

### Add User:

- Click "Add New User" button
- Fill in username, email, and optional description
- Click "Create"

### Edit User:

- Click "Edit" button on any user row
- Modify the fields
- Click "Update"

### Delete User:

- Click "Delete" button on any user row
- Confirm deletion

### View All Users:

- Users are automatically loaded on page load
- Table shows all users with their information

## Notes

- CORS is already configured in the backend to allow frontend requests
- All API responses follow the ApiResponse wrapper format
- Form validation is done on the frontend (username and email required, email must be valid format)
- Delete operations require user confirmation to prevent accidents
