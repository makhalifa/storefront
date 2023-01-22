# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

<!-- API routes information -->
## API Routes
#### Products
- Index: /products [GET]
- Show: /products/:id [GET]
- Create: /products [POST]

#### Users
- Index: /users [GET]
- Show: /users/:id [GET]
- Create: /users [POST]

#### Orders
- Current Order by user: /orders/:user_id [GET]
- [OPTIONAL] Completed Orders by user: /orders/:user_id [GET]

<!-- Database tables information -->
## Database Tables
#### Products
- id: varchar
- name: varchar
- price: varchar
- category: varchar

#### Users
- id: varchar
- firstName: varchar
- lastName: varchar
- password: varchar

#### Orders
- id: varchar
- product_id: varchar
- quantity: varchar
- user_id: varchar
- status: varchar
