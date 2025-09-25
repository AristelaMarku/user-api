User API

A simple NestJS + TypeORM + PostgreSQL project that provides a REST API for managing users.

This project was built with TypeScript, Swagger documentation, and testing with Jest.

Features

Create User – Add a new user with details (name, email, city, role).

Get All Users – Retrieve all users in the database.

Filter Users by City – Fetch all users who belong to a specific city.

Filter Users by Role – Fetch users based on their assigned role.

Update User – Update user details by ID.

Delete User – Remove a user by ID.

Swagger Documentation – Auto-generated API docs available at [/api/docs](http://localhost:3000/api).


Tech Stack
NestJS => Node.js framework

TypeORM => ORM for database access
PostgreSQL => Relational database
TypeScript => Strong typing
Jest => Testing framework
Swagger => API documentation


API Endpoints

Method	Endpoint	Description

POST	/users	Create a new user

GET	/users	Get all users

GET	/users/city/:city	Get users by city

GET	/users/role/:role	Get users filtered by role

PATCH	/users/:id	Update user by ID

DELETE	/users/:id	Delete user by ID