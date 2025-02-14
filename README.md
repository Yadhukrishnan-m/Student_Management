# Student Management System 

## Overview
This project is a **User Management System** implemented in **TypeScript** . It follows the **Repository Architecture** and utilizes **Dependency Injection (DI)** to ensure modularity and testability.

## Features
### **User Features**
- **Register** a new account.
- **Login** with valid credentials to obtain a JWT token.
- **Edit Own Profile** (update user details).

### **Admin Features**
- **Admin Login** with higher privileges.
- **Edit Any User** profile.
- **Delete Users** from the system.

## Technologies Used
- **TypeScript**
- **Node.js & Express.js**
- **Bcrypt.js for password hashing**
- **Dependency Injection for modular design**
- **MongoDB 
- **Repository Pattern for data access**

## Project Structure
```
/src
 ├── controllers    # Handles HTTP requests
 ├── services       # Business logic layer
 ├── repositories   # Data access layer
 ├── middlewares    # Authentication & validation
 ├── models         # User schema/model definition
 ├── utils          # Helper functions
 ├── routes         # API route definitions
 ├── config         # Configuration settings
 └── app.ts         # Entry point
```







