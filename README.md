# 🖥️ Employee Management System — Backend API

> A RESTful API built with Node.js, Express, and MySQL for managing employee records — supporting full CRUD operations and keyword-based search.

🔗 **Live API:** [employee-backend-ry8m.onrender.com](https://employee-backend-ry8m.onrender.com)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Reference](#api-reference)
- [Database Setup](#database-setup)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

**Employee Management System Backend** is a Node.js REST API that serves as the data layer for the Employee Management frontend application. It exposes endpoints to create, retrieve, search, update, and delete employee records, backed by a MySQL relational database. The API is deployed on Render and communicates with the React frontend via Axios.

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express 5 |
| **Database** | MySQL |
| **MySQL Client** | mysql2 3 |
| **Environment** | dotenv |
| **CORS** | cors |
| **Dev Server** | nodemon |
| **Language** | JavaScript (CommonJS) |
| **Deployment** | Render |

---

## ✨ Features

- ➕ **Create Employee** — Add new employee records to the database
- 📋 **List All Employees** — Retrieve a full list of all employees
- 👤 **Get by ID** — Fetch a single employee's details by their ID
- 🔍 **Keyword Search** — Search employees by name, email, or role using a query string
- ✏️ **Update Employee** — Edit existing employee details
- ❌ **Delete Employee** — Remove an employee record permanently

---

## 📁 Project Structure

```
Employee_Backend/
├── Config/
│   └── db.js             # MySQL database connection configuration
├── Controller/
│   └── employeeController.js   # Business logic for all employee operations
├── Routes/
│   └── employeeRoutes.js       # Express route definitions
├── index.js              # App entry point — server setup and middleware
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+
- **MySQL** v8+ (local instance or remote)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/KamatchiKarthi/Employee_Backend.git
   cd Employee_Backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root (see [Environment Variables](#environment-variables)):

   ```bash
   cp .env.example .env
   ```

4. **Set up the database**

   Create the MySQL database and table (see [Database Setup](#database-setup)).

5. **Start the development server**

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000` (or your configured port).

---

## 🔐 Environment Variables

Create a `.env` file in the project root with the following variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=employee_management
PORT=5000
```

| Variable | Description |
|---|---|
| `DB_HOST` | MySQL host (e.g., `localhost` or remote host) |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | MySQL database name |
| `PORT` | Port the Express server listens on |

> ⚠️ Never commit your `.env` file to version control. It is already listed in `.gitignore`.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start the server using Node.js |
| `npm run dev` | Start with nodemon (auto-restarts on file changes) |

---

## 📡 API Reference

**Base URL (Production):** `https://employee-backend-ry8m.onrender.com`

**Base URL (Local):** `http://localhost:5000`

---

### Create Employee

```
POST /create
```

**Request Body (JSON):**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Developer"
}
```

**Response:** `201 Created` — the newly created employee object.

---

### Get All Employees

```
GET /all
```

**Response:** `200 OK` — array of all employee records.

---

### Get Employee by ID

```
GET /empoly/:id
```

| Param | Type | Description |
|---|---|---|
| `id` | `number` | Employee's unique ID |

**Response:** `200 OK` — single employee object.

---

### Search Employees

```
GET /search?query=<keyword>
```

| Query Param | Type | Description |
|---|---|---|
| `query` | `string` | Keyword to search by name, email, or role |

**Response:** `200 OK` — array of matching employee records.

---

### Update Employee

```
PUT /update/:id
```

| Param | Type | Description |
|---|---|---|
| `id` | `number` | Employee's unique ID |

**Request Body (JSON):** Any combination of updatable fields:

```json
{
  "name": "Jane Doe",
  "role": "Manager"
}
```

**Response:** `200 OK` — success message or updated record.

---

### Delete Employee

```
DELETE /delete/:id
```

| Param | Type | Description |
|---|---|---|
| `id` | `number` | Employee's unique ID |

**Response:** `200 OK` — success message confirming deletion.

---

## 🗄 Database Setup

Run the following SQL to create the required database and table in MySQL:

```sql
CREATE DATABASE IF NOT EXISTS employee_management;

USE employee_management;

CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚢 Deployment

This backend is deployed on **Render** (free tier).

> **Note:** On Render's free tier, the server spins down after a period of inactivity. The first request after inactivity may take **30–60 seconds** to respond while the instance wakes up.

To deploy your own instance:

1. Push this repository to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Set the **Build Command** to `npm install`
4. Set the **Start Command** to `npm start`
5. Add all required environment variables in the Render dashboard under **Environment**

---

## 📄 License

This project is licensed under the ISC License.
