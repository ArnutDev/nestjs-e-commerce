# NestJS E-Commerce Backend

A RESTful E-Commerce Backend API built with **NestJS**, **Prisma ORM**, and **PostgreSQL**. This project demonstrates common backend features such as JWT authentication, product management, shopping carts, **checkout with database transactions**, and order management.

## Features

### Authentication

- User registration
- User login with JWT
- User profile
- Protected endpoints using JWT authentication

### Product Management

- Create product
- Update product
- Delete product
- Get all products
- Get product by ID

### Category Management

- Create category
- Update category
- Delete category
- List categories
- Get categories by ID

### Shopping Cart

- Add product to cart
- Remove product
- View current cart

### Checkout & Orders

- Checkout cart
- Database transaction for checkout
- Automatically decrease product stock
- Clear cart after successful checkout
- View order history
- View order details

## Tech Stack

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Swagger (OpenAPI)
- Docker & Docker Compose

## Project Structure

```text
src/
├── auth/
├── users/
├── products/
├── categories/
├── carts/
├── orders/
├── prisma/
```

## Getting Started

### Prerequisites

- Node.js 22+
- Docker Desktop

### Installation

Clone the repository

```bash
git clone https://github.com/ArnutDev/nestjs-e-commerce.git
cd nestjs-e-commerce/backend
```

Install dependencies

```bash
npm install
```

Copy environment variables

```bash
cp .env.example .env
```

Generate Prisma Client

```bash
npx prisma generate
```

Run database migrations

```bash
npx prisma migrate deploy
```

Start the application

```bash
npm run start:dev
```

## Running with Docker

Build and start all services

```bash
docker compose up --build
```

Stop services

```bash
docker compose down
```

## API Documentation

After starting the server, Swagger is available at

```text
http://localhost:3000/api
```

## Environment Variables

Example `.env`

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=ecommerce

DATABASE_URL=postgresql://postgres:your_password@postgres:5432/ecommerce

JWT_SECRET=your_jwt_secret

PORT=3000
```

## Future Improvements

- Role-based authorization (Admin/User)
- Product search & filtering
- Pagination
- Unit and integration testing
- CI/CD pipeline
- API rate limiting
- Product image upload

## Author

Arnut Buadonpai
