# Invoice Management Microservice API

A robust RESTful API service for managing invoices with user authentication, PDF generation, and complete CRUD operations.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Invoice Endpoints](#invoice-endpoints)
- [Error Handling](#error-handling)
- [Security](#security)

## Features

- User authentication and authorization
- Invoice CRUD operations
- PDF invoice generation
- Data validation
- Swagger documentation
- Secure password hashing
- JWT-based authentication

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- PDFKit for PDF generation
- Swagger for API documentation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/OcheOps/Invoice-api.git
```

2. Install dependencies:
```bash
cd Invoice-api
npm install
```

3. Set up environment variables (see [Environment Variables](#environment-variables) section)

4. Start the server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/invoice-service
JWT_SECRET=your-secret-key-here
```

## API Documentation

### Authentication Endpoints

#### 1. Register User
- **URL**: `/api/users/register`
- **Method**: `POST`
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```
- **Success Response**: `201 Created`
```json
{
  "token": "jwt-token-here"
}
```

#### 2. Login User
- **URL**: `/api/users/login`
- **Method**: `POST`
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **Success Response**: `200 OK`
```json
{
  "token": "jwt-token-here"
}
```

### Invoice Endpoints

All invoice endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

#### 1. Create Invoice
- **URL**: `/api/invoices`
- **Method**: `POST`
- **Request Body**:
```json
{
  "clientName": "Acme Corp",
  "items": [
    {
      "description": "Web Development",
      "quantity": 1,
      "price": 1000
    }
  ],
  "dueDate": "2024-12-31"
}
```
- **Success Response**: `201 Created`
```json
{
  "_id": "invoice-id",
  "invoiceNumber": "INV-123456",
  "clientName": "Acme Corp",
  "items": [...],
  "total": 1000,
  "status": "draft",
  "dueDate": "2024-12-31",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### 2. Get All Invoices
- **URL**: `/api/invoices`
- **Method**: `GET`
- **Success Response**: `200 OK`
```json
[
  {
    "_id": "invoice-id",
    "invoiceNumber": "INV-123456",
    "clientName": "Acme Corp",
    "items": [...],
    "total": 1000,
    "status": "draft",
    "dueDate": "2024-12-31",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### 3. Update Invoice
- **URL**: `/api/invoices/:id`
- **Method**: `PUT`
- **Request Body**:
```json
{
  "clientName": "Updated Corp",
  "status": "sent"
}
```
- **Success Response**: `200 OK`
```json
{
  "_id": "invoice-id",
  "invoiceNumber": "INV-123456",
  "clientName": "Updated Corp",
  "status": "sent",
  ...
}
```

#### 4. Delete Invoice
- **URL**: `/api/invoices/:id`
- **Method**: `DELETE`
- **Success Response**: `200 OK`
```json
{
  "message": "Invoice deleted"
}
```

#### 5. Download Invoice PDF
- **URL**: `/api/invoices/:id/download`
- **Method**: `GET`
- **Success Response**: `200 OK`
- **Response Type**: `application/pdf`
- **Description**: Returns a downloadable PDF file of the invoice

## Error Handling

The API uses standard HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Server Error

Error responses follow this format:
```json
{
  "message": "Error description here"
}
```

## Security

- All endpoints (except registration and login) require JWT authentication
- Passwords are hashed using bcrypt
- API is protected with various HTTP headers using helmet
- Input validation is performed using express-validator
- CORS is configured for secure cross-origin requests

## Swagger Documentation

API documentation is available at `/api-docs` when running the server locally.

## Running Tests

```bash
npm test
```

## License

MIT