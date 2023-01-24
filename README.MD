# Storefront Backend Project

## Getting Started
- Fork and clone this repository
- Run `npm install` to install all dependencies
- Run `npm start` to start the application
- Run `npm test` to run the tests

## Database Setup
### 1. CREATE DATABASE
- `CREATE DATABASE storefront;`
- `CREATE DATABASE storefront_test;`

### 2. CREATE USER
- `CREATE USER full_stack_user WITH PASSWORD 'pass123';`

### 3. GRANT PRIVILEGES
- `GRANT ALL PRIVILEGES ON DATABASE storefront TO storefront;`
- `GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storefront;`

### 4. CREATE TABLES
- RUN `db-migrate up` to create tables

## Required Technologies
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- supertest from npm for testing HTTP requests
- bcrypt from npm for hashing passwords
- pg from npm for working with Postgres

## environment variables
Your application must make use of the following environment variables:
- `PORT` - the port your application will run on
- `POSTGRES_HOST`
- `POSTGRES_DB=storefront`
- `POSTGRES_TEST_DB=storefront_test`
- `POSTGRES_PORT`
- `POSTGRES_USER=full_stack_user`
- `POSTGRES_PASSWORD=pass123`
- `BCRYPT_PASSWORD` - the password used to hash passwords
- `SALT_ROUNDS` - the number of salt rounds used to hash passwords
- `TOKEN_SECRET` - the secret used to sign JWTs

## API Endpoints  <!-- end points and the functionality -->
<!-- Product endpoints -->
- `GET /products` - returns all products
- `GET /products/:id` - returns a single product
- `POST /products` - creates a new product
- `PUT /products/:id` - updates a product
- `DELETE /products/:id` - deletes a product

<!-- order endpoints -->
- `GET /orders` - returns all orders
- `GET /orders/:id` - returns a single order
- `POST /orders` - creates a new order
- `PUT /orders/:id` - updates an order
- `DELETE /orders/:id` - deletes an order
- `post /orders/:id/products` - adds a product to an order
- `get /orders/:id/products` - returns all products in an order

<!-- user endpoints -->
- `GET /users` - returns all users
- `GET /users/:id` - returns a single user
- `POST /users` - creates a new user
- `PUT /users/:id` - updates a user
- `DELETE /users/:id` - deletes a user
