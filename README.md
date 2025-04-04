# Exam Group J API

A RESTful API for managing exams and users, built with Express.js and TypeORM.

## Contributors and Features

### Member 1
- Implemented GET /exams endpoint that returns a hardcoded list of users

### Member 2
- Implemented POST /exams endpoint for adding new exams to the system

### Member 3
- Implemented PUT /exams/:id endpoint for updating existing exams

### Member 4
- Merging of other branches 

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### Users

##### GET /users/exams
Returns a hardcoded list of users.

**Response**
```json
{
    "users": [
        {
            "id": 1,
            "username": "user1",
            "email": "user1@example.com"
        },
        {
            "id": 2,
            "username": "user2",
            "email": "user2@example.com"
        },
        {
            "id": 3,
            "username": "user3",
            "email": "user3@example.com"
        }
    ]
}
```

##### POST /users/exams
Adds a new exam to the system.

**Request Body**
```json
{
    "title": "Final Exam",
    "description": "End of semester examination",
    "date": "2024-05-15"
}
```

**Response**
```json
{
    "message": "Exam created successfully",
    "exam": {
        "id": 1,
        "title": "Final Exam",
        "description": "End of semester examination",
        "date": "2024-05-15",
        "createdAt": "2024-04-04T10:45:00.000Z"
    }
}
```

##### PUT /users/exams/:id
Updates an existing exam.

**Request Parameters**
- `id`: The ID of the exam to update

**Request Body**
```json
{
    "title": "Updated Final Exam",
    "description": "Updated end of semester examination",
    "date": "2024-05-20"
}
```

**Response**
```json
{
    "message": "Exam updated successfully",
    "exam": {
        "id": 1,
        "title": "Updated Final Exam",
        "description": "Updated end of semester examination",
        "date": "2024-05-20",
        "createdAt": "2024-04-04T10:45:00.000Z",
        "updatedAt": "2024-04-04T11:00:00.000Z"
    }
}
```

### Error Responses

#### 400 Bad Request
```json
{
    "error": "Title, description, and date are required"
}
```

#### 404 Not Found
```json
{
    "error": "Exam not found"
}
```

#### 500 Internal Server Error
```json
{
    "error": "Internal server error"
}
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Start the production server:
```bash
npm start
```

## Technologies Used

- Express.js
- TypeORM
- MySQL
- Joi (for validation)
- Helmet (for security)
- CORS
- bcryptjs (for password hashing)
