# Notes API Project

This project is a RESTful API for managing notes, built as a learning exercise for TypeScript. It demonstrates JWT authorization implementation and CRUD operations using Mongoose with MongoDB, providing a solid understanding of backend development concepts.

## Features

- User authentication with JWT (JSON Web Tokens)
- Complete CRUD operations for notes
- MongoDB integration using Mongoose
- TypeScript implementation
- Input validation
- Error handling

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/emre-tiryaki/Notes_api-project.git
cd Notes_api-project
```

2. Install dependencies
```bash
npm install
```

3. Environment Configuration
   - Create a `.env` file in the root directory based on the `.env.example` file
   - Fill in the required environment variables:
  
```
PORT=3000                            # The port your API will run on
MONGODB_URI=mongodb://localhost:27017/notes_db  # Your MongoDB connection string
JWT_SECRET=your_jwt_secret_key       # Secret key for JWT token generation
JWT_EXPIRATION=1d                    # JWT token expiration time (e.g., 1d for 1 day)
```

4. Start the development server
```bash
npm run devStart
```

## API Endpoints

### Authentication

#### POST /auth/register
- **Description**: Register a new user
- **Request Body**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
- **Responses**:
  - `201 Created`:
  ```json
  {
    "message": "User registered successfully"
  }
  ```
  - `400 Bad Request`:
  ```json
  {
    "error": "Validation error message"
  }
  ```
  - `409 Conflict`:
  ```json
  {
    "error": "User already exists"
  }
  ```

#### POST /auth/login
- **Description**: Authenticate a user and receive a JWT token
- **Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **Responses**:
  - `200 OK`:
  ```json
  {
    "token": "jwt_token_string",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string"
    }
  }
  ```
  - `401 Unauthorized`:
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

### Notes

#### GET /notes/all
- **Description**: Get all notes for the authenticated user
- **Headers**: 
  - `Authorization: Bearer {token}`
- **Responses**:
  - `200 OK`:
  ```json
  {
    "notes": [
      {
        "id": "string",
        "title": "string",
        "content": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ]
  }
  ```
  - `401 Unauthorized`:
  ```json
  {
    "error": "Unauthorized"
  }
  ```

#### GET /notes/:id
- **Description**: Get a specific note by ID
- **Headers**: 
  - `Authorization: Bearer {token}`
- **URL Parameters**:
  - `id`: Note ID
- **Responses**:
  - `200 OK`:
  ```json
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```
  - `404 Not Found`:
  ```json
  {
    "error": "Note not found"
  }
  ```
  - `401 Unauthorized`:
  ```json
  {
    "error": "Unauthorized"
  }
  ```

#### POST /notes
- **Description**: Create a new note
- **Headers**: 
  - `Authorization: Bearer {token}`
- **Request Body**:
```json
{
  "title": "string",
  "content": "string"
}
```
- **Responses**:
  - `201 Created`:
  ```json
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```
  - `400 Bad Request`:
  ```json
  {
    "error": "Validation error message"
  }
  ```
  - `401 Unauthorized`:
  ```json
  {
    "error": "Unauthorized"
  }
  ```

#### PUT /notes/:id
- **Description**: Update an existing note
- **Headers**: 
  - `Authorization: Bearer {token}`
- **URL Parameters**:
  - `id`: Note ID
- **Request Body**:
```json
{
  "title": "string",
  "content": "string"
}
```
- **Responses**:
  - `200 OK`:
  ```json
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```
  - `404 Not Found`:
  ```json
  {
    "error": "Note not found"
  }
  ```
  - `401 Unauthorized`:
  ```json
  {
    "error": "Unauthorized"
  }
  ```

#### DELETE /notes/:id
- **Description**: Delete a note
- **Headers**: 
  - `Authorization: Bearer {token}`
- **URL Parameters**:
  - `id`: Note ID
- **Responses**:
  - `200 OK`:
  ```json
  {
    "message": "Note deleted successfully"
  }
  ```
  - `404 Not Found`:
  ```json
  {
    "error": "Note not found"
  }
  ```
  - `401 Unauthorized`:
  ```json
  {
    "error": "Unauthorized"
  }
  ```

## Error Handling

The API returns appropriate HTTP status codes and error messages in the following format:

```json
{
  "error": "Error message"
}
```

## Authentication

All routes except for `/auth/register` and `/auth/login` require authentication.
Include the JWT token in the Authorization header as follows:

```
Authorization: Bearer <your_token_here>
```

## Thank You

Thank you for your interest in this Notes API project! This project was developed as a learning exercise to gain a better understanding of TypeScript, JWT authorization, and CRUD operations with Mongoose. Feel free to fork and modify it for your own learning purposes.

If you have any questions or suggestions, please feel free to open an issue or submit a pull request.
