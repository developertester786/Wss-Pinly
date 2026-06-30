# Wss-Pinly

A hyperlocal business discovery platform that helps users discover trusted local businesses and services nearby.

---

# Tech Stack

## Frontend
- React.js

## Backend
- Node.js
- Express.js
- Sequelize ORM

## Database
- MySQL

---

# Project Structure

```text
Wss-Pinly/
├── frontend/
└── backend/
```

---

# Prerequisites

Make sure the following are installed on your system:

- Node.js (v18 or later recommended)
- npm
- MySQL Server
- Git

---

# Clone the Repository

```bash
git clone <repository-url>
cd Wss-Pinly
```

---

# Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend/pinly
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm start
```

Frontend will run on:

```
http://localhost:3000
```

---

# Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

# Database Setup (MySQL)

## Step 1: Create Database

Open MySQL and run:

```sql
CREATE DATABASE pinly_db;
```

---

## Step 2: Configure Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=pinly_db
DB_USER=root
DB_PASSWORD=your_password

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

Update the values according to your local environment.

---

## Step 3: Run Database Migrations

Run the following command to create all database tables:

```bash
npx sequelize-cli db:migrate
```

---

## Step 4: Run Seeders

Run the following command to insert the default data (Roles, Admin User, etc.):

```bash
npx sequelize-cli db:seed:all
```

If you want to run a specific seeder:

```bash
npx sequelize-cli db:seed --seed <seed-file-name>
```

---

## Step 5: Start Backend

```bash
npm start
```

or

```bash
npm run dev
```

(if using nodemon)

Backend will start on:

```
http://localhost:5000
```

---

# Useful Sequelize Commands

### Run Migrations

```bash
npx sequelize-cli db:migrate
```

### Undo Last Migration

```bash
npx sequelize-cli db:migrate:undo
```

### Undo All Migrations

```bash
npx sequelize-cli db:migrate:undo:all
```

### Run All Seeders

```bash
npx sequelize-cli db:seed:all
```

### Undo Last Seeder

```bash
npx sequelize-cli db:seed:undo
```

### Undo All Seeders

```bash
npx sequelize-cli db:seed:undo:all
```

### Generate a New Migration

```bash
npx sequelize-cli migration:generate --name migration-name
```

### Generate a New Seeder

```bash
npx sequelize-cli seed:generate --name seeder-name
```

---

# API Features

## Authentication

### Customer

- Mobile OTP Login
- JWT Authentication
- Profile API

### Admin

- Email & Password Login
- JWT Authentication

### Staff

- Email & Password Login

### Business

- Email & Password Login

---

The seeders create:

- Admin Role
- Staff Role
- Business Role
- Customer Role
- Default Admin User

---

# Git Workflow

Project branches follow this workflow:

```text
feature-branch
      │
      ▼
develop
      │
      ▼
master
```

Developers work on their own feature branches and create Pull Requests to `develop`. After testing, `develop` is merged into `master`.

---

# Notes

- Make sure MySQL Server is running before starting the backend.
- Configure the `.env` file before running the application.
- Run database migrations before starting the backend.
- Run seeders to insert the default Roles and Admin user.
- Never commit `.env` or `node_modules` to Git.
- Use feature branches for development and create Pull Requests before merging into `develop`.

---


