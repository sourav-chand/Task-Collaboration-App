# Task Collaboration App - API Endpoints Guide for Postman

## Base URL

```
http://localhost:5000
```

## Authentication Endpoints

### 1. Register User

- **Method**: POST
- **URL**: `/api/auth/register`
- **Headers**:
  - Content-Type: application/json
- **Body** (raw JSON):

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

- **Response**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Login User

- **Method**: POST
- **URL**: `/api/auth/login`
- **Headers**:
  - Content-Type: application/json
- **Body** (raw JSON):

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

- **Response**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Get Current User

- **Method**: GET
- **URL**: `/api/auth/user`
- **Headers**:
  - x-auth-token: [YOUR_JWT_TOKEN]
- **Response**:

```json
{
  "_id": "5f9d88d3f3b4b50017b4b4b4",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2020-10-31T14:00:00.000Z"
}
```

## Project Endpoints

### 4. Create Project

- **Method**: POST
- **URL**: `/api/projects`
- **Headers**:
  - Content-Type: application/json
  - x-auth-token: [YOUR_JWT_TOKEN]
- **Body** (raw JSON):

```json
{
  "name": "My New Project",
  "description": "This is a sample project"
}
```

- **Response**:

```json
{
  "_id": "5f9d88d3f3b4b50017b4b4b5",
  "name": "My New Project",
  "description": "This is a sample project",
  "owner": "5f9d88d3f3b4b50017b4b4b4",
  "members": ["5f9d88d3f3b4b50017b4b4b4"],
  "createdAt": "2020-10-31T14:00:00.000Z",
  "updatedAt": "2020-10-31T14:00:00.000Z"
}
```

### 5. Get All Projects

- **Method**: GET
- **URL**: `/api/projects`
- **Headers**:
  - x-auth-token: [YOUR_JWT_TOKEN]
- **Response**:

```json
[
  {
    "_id": "5f9d88d3f3b4b50017b4b4b5",
    "name": "My New Project",
    "description": "This is a sample project",
    "owner": {
      "_id": "5f9d88d3f3b4b50017b4b4b4",
      "name": "John Doe"
    },
    "members": ["5f9d88d3f3b4b50017b4b4b4"],
    "createdAt": "2020-10-31T14:00:00.000Z",
    "updatedAt": "2020-10-31T14:00:00.000Z"
  }
]
```

### 6. Delete Project

- **Method**: DELETE
- **URL**: `/api/projects/:id`
- **Headers**:
  - x-auth-token: [YOUR_JWT_TOKEN]
- **Response**:

```json
{
  "msg": "Project removed"
}
```

## Task Endpoints

### 7. Create Task

- **Method**: POST
- **URL**: `/api/projects/:project_id/tasks`
- **Headers**:
  - Content-Type: application/json
  - x-auth-token: [YOUR_JWT_TOKEN]
- **Body** (raw JSON):

```json
{
  "title": "Complete documentation",
  "description": "Write comprehensive documentation for the project",
  "status": "To Do",
  "assignedTo": "5f9d88d3f3b4b50017b4b4b4"
}
```

- **Response**:

```json
{
  "_id": "5f9d88d3f3b4b50017b4b4b6",
  "title": "Complete documentation",
  "description": "Write comprehensive documentation for the project",
  "status": "To Do",
  "assignedTo": {
    "_id": "5f9d88d3f3b4b50017b4b4b4",
    "name": "John Doe"
  },
  "project": {
    "_id": "5f9d88d3f3b4b50017b4b4b5",
    "name": "My New Project"
  },
  "createdAt": "2020-10-31T14:00:00.000Z",
  "updatedAt": "2020-10-31T14:00:00.000Z"
}
```

### 8. Get All Tasks for a Project

- **Method**: GET
- **URL**: `/api/projects/:project_id/tasks`
- **Headers**:
  - x-auth-token: [YOUR_JWT_TOKEN]
- **Response**:

```json
[
  {
    "_id": "5f9d88d3f3b4b50017b4b4b6",
    "title": "Complete documentation",
    "description": "Write comprehensive documentation for the project",
    "status": "To Do",
    "assignedTo": {
      "_id": "5f9d88d3f3b4b50017b4b4b4",
      "name": "John Doe"
    },
    "project": {
      "_id": "5f9d88d3f3b4b50017b4b4b5",
      "name": "My New Project"
    },
    "createdAt": "2020-10-31T14:00:00.000Z",
    "updatedAt": "2020-10-31T14:00:00.000Z"
  }
]
```

### 9. Update Task

- **Method**: PUT
- **URL**: `/api/tasks/:id`
- **Headers**:
  - Content-Type: application/json
  - x-auth-token: [YOUR_JWT_TOKEN]
- **Body** (raw JSON):

```json
{
  "title": "Complete documentation and publish",
  "description": "Write comprehensive documentation for the project and publish it",
  "status": "In Progress"
}
```

- **Response**:

```json
{
  "_id": "5f9d88d3f3b4b50017b4b4b6",
  "title": "Complete documentation and publish",
  "description": "Write comprehensive documentation for the project and publish it",
  "status": "In Progress",
  "assignedTo": {
    "_id": "5f9d88d3f3b4b50017b4b4b4",
    "name": "John Doe"
  },
  "project": {
    "_id": "5f9d88d3f3b4b50017b4b4b5",
    "name": "My New Project"
  },
  "createdAt": "2020-10-31T14:00:00.000Z",
  "updatedAt": "2020-10-31T15:00:00.000Z"
}
```

### 10. Delete Task

- **Method**: DELETE
- **URL**: `/api/tasks/:id`
- **Headers**:
  - x-auth-token: [YOUR_JWT_TOKEN]
- **Response**:

```json
{
  "msg": "Task removed"
}
```

## Postman Collection Setup

1. Create a new collection called "Task Collaboration App"
2. Create environment variables:

   - `BASE_URL`: http://localhost:5000
   - `TOKEN`: [Leave empty, will be populated after login]

3. For endpoints that require authentication:

   - In the "Authorization" tab, select "Bearer Token"
   - Enter `{{TOKEN}}` in the token field

4. After successful login or registration:
   - In the "Tests" tab of the login/register request, add:
   ```javascript
   pm.environment.set("TOKEN", pm.response.json().token);
   ```

## Error Responses

Common error responses you might encounter:

- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Missing or invalid authentication token
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side error

## Authentication Flow

1. Register or Login to get a JWT token
2. Use the token in the `x-auth-token` header for all protected endpoints
3. The token expires after 7 days
