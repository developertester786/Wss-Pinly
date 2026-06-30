# Wss-Pinly

A hyperlocal business discovery platform that helps users find trusted local businesses and services nearby.

## Tech Stack

### Frontend
- React.js

### Backend
- Node.js
- Express.js

### Database
- MySQL

## Project Structure

```
Wss-Pinly/
├── frontend/
└── backend/
```

## Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Wss-Pinly
```

---

## Frontend Setup

```bash
cd frontend/pinly
npm install
npm start
```

The frontend will start on:

```
http://localhost:3000
```

---

## Backend Setup

```bash
cd backend
npm install
npm start
```

The backend will start on:

```
http://localhost:5000
```

---

## Database Setup (MySQL)

### 1. Install MySQL

Download and install MySQL Server if it is not already installed.

### 2. Create the Database

Run the following command in MySQL:

```sql
CREATE DATABASE pinly_db;
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` folder and add the following:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=pinly_db
DB_USER=root
DB_PASSWORD=your_password

PORT=5000
```

### 4. Start the Backend

```bash
npm start
```

If the configuration is correct, the backend will connect to the MySQL database successfully.

---

## Notes

- Make sure MySQL Server is running before starting the backend.
- Install all dependencies using `npm install` before running the project.
- Database tables and schema will be added as development progresses.