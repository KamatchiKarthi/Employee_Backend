Employee Management API

This project is a RESTful API built using Node.js, Express, and MySQL for managing employees. It provides endpoints to create, read, search, update, and delete employee records.

Features

➕ Create a new employee

📋 Retrieve all employees

🔍 Search employees by keyword

👤 Get a single employee by ID

✏️ Update employee details

❌ Delete an employee

| Method | Endpoint             | Description                              | Body Params (JSON)                                                     |
| ------ | -------------------- | ---------------------------------------- | ---------------------------------------------------------------------- |
| POST   | `/create`            | Create a new employee                    | `{ "name": "John", "email": "john@example.com", "role": "Developer" }` |
| GET    | `/all`               | Get all employees                        | -                                                                      |
| GET    | `/empoly/:id`        | Get employee by ID                       | -                                                                      |
| GET    | `/search?query=John` | Search employees by name, email, or role | -                                                                      |
| PUT    | `/update/:id`        | Update an employee                       | `{ "name": "Jane", "role": "Manager" }`                                |
| DELETE | `/delete/:id`        | Delete an employee                       | -                                                                      |
