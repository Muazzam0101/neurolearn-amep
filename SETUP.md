# AMEP Authentication Setup

## Prerequisites
1. Install PostgreSQL on your system
2. Create a database named 'amep_db'

## Database Setup

### Option 1: Using PostgreSQL Command Line
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE amep_db;

-- Connect to the database
\c amep_db;

-- The users table will be created automatically when you start the backend
```

### Option 2: Using pgAdmin
1. Open pgAdmin
2. Create a new database named 'amep_db'
3. The users table will be created automatically

## Environment Setup

1. Update the `.env` file in the backend directory with your PostgreSQL credentials:
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=amep_db
DB_USER=postgres
DB_PASSWORD=your_actual_password
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_random
```

## Running the Application

### Start Backend (Terminal 1):
```bash
cd backend
npm start
```

### Start Frontend (Terminal 2):
```bash
cd frontend
npm start
```

## Features Implemented

### Backend:
- Express.js server with CORS enabled
- PostgreSQL database integration
- User registration and login endpoints
- Password hashing with bcrypt
- JWT token authentication
- Automatic database table creation

### Frontend:
- Modern, responsive UI design
- Form validation
- Loading states and error handling
- Toast notifications
- Role-based user registration (Student/Teacher)
- API integration with axios
- React Router for navigation

## API Endpoints

- POST `/api/signup` - User registration
- POST `/api/login` - User login

## Database Schema

### Users Table:
- id (SERIAL PRIMARY KEY)
- email (VARCHAR UNIQUE)
- password (VARCHAR - hashed)
- role (VARCHAR - 'student' or 'teacher')
- created_at (TIMESTAMP)

## Next Steps

After successful login, users will be redirected to:
- Students: `/student-dashboard`
- Teachers: `/teacher-dashboard`

You'll need to create these dashboard components next.