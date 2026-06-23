# E-Commerce Backend API

A production-style RESTful E-Commerce Backend API built with Node.js, Express.js, MongoDB, and JWT Authentication. The project implements secure user authentication, role-based authorization, product management, cart management, order processing, image uploads, request validation, and centralized error handling using a layered architecture.

## Features

### Authentication & Authorization

* User Registration
* User Login
* User Logout
* JWT Access Token Authentication
* Refresh Token Mechanism
* Role-Based Authorization (Admin/User)
* Password Hashing using bcrypt

### Product Management

* Create Product (Admin Only)
* Get All Products
* Get Single Product
* Update Product (Admin Only)
* Delete Product (Admin Only)

### Cart Management

* Add Product to Cart
* View Cart
* Update Product Quantity
* Remove Product from Cart

### Order Management

* Place Order
* View My Orders
* View All Orders (Admin Only)
* Cancel Order
* Update Order Status (Admin Only)

### Image Uploads

* Single and Multiple Image Upload Support
* Multer Integration
* File Type Validation
* File Size Limits
* Unique File Name Generation
* Static File Serving

### Validation & Error Handling

* Joi Request Validation
* Centralized Error Handling
* Custom API Error Responses
* Async Error Wrapper Middleware

### Logging

* Winston Logger Integration
* Error Logging
* Request Logging

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JSON Web Token (JWT)
* bcrypt

### Validation

* Joi

### File Upload

* Multer

### Logging

* Winston

---

## Project Architecture

```txt
src
│
├── config
│
├── controllers
│
├── middleware
│
├── models
│
├── routes
│
├── services
│
├── validations
│
├── utils
│
└── logs
```

The project follows a layered architecture:

```txt
Client
↓
Routes
↓
Middleware
↓
Controllers
↓
Services
↓
Models
↓
MongoDB
```

---

## API Modules

### Auth Module

* Register User
* Login User
* Logout User
* Refresh Access Token

### Product Module

* Create Product
* Get All Products
* Get Single Product
* Update Product
* Delete Product

### Cart Module

* Add To Cart
* Get Cart
* Update Cart Quantity
* Remove Cart Item

### Order Module

* Place Order
* Get My Orders
* Get All Orders
* Cancel Order
* Update Order Status

### Upload Module

* Upload Single Image
* Upload Multiple Images

---

## Installation

### Clone Repository

```bash
git clone <your-repository-url>
cd <repository-name>
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

MONGODB_URL=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
```

### Start Development Server

```bash
npm run dev
```

### Start Production Server

```bash
npm start
```

---

## Authentication Flow

```txt
Register
↓
Login
↓
Access Token Generated
↓
Protected Routes
↓
Refresh Token Rotation
↓
Logout
```

---

## Security Features

* JWT Authentication
* Refresh Token Management
* Password Hashing using bcrypt
* Role-Based Access Control
* Request Validation using Joi
* Protected Routes
* File Upload Restrictions
* File Size Limits

---

## Learning Outcomes

Through this project I practiced:

* REST API Development
* JWT Authentication & Authorization
* MongoDB Data Modeling
* Mongoose Relationships
* Middleware Design
* Service Layer Architecture
* File Upload Handling
* Request Validation
* Error Handling
* Logging & Debugging
* API Testing using Postman

---

## Future Improvements

* Cloud Storage Integration (AWS S3 / Cloudinary)
* Payment Gateway Integration
* Product Reviews & Ratings
* Inventory Management
* Order Tracking System
* Pagination & Filtering
* Docker Containerization
* Unit & Integration Testing

---

## Author

Kartikey Yadav

Backend Developer | MERN Stack Learner
