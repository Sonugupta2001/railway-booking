# Railway Management System Documentation
## Project Overview
The Railway Management System is designed to provide a real-time platform for booking train tickets and managing railway operations. It includes role-based access for users (Admin and regular users) and ensures concurrency handling for simultaneous seat bookings. The system is optimized to handle large traffic and avoid booking conflicts.

## Tech Stack
Backend Framework: Node.js with Express.js
Database: PostgreSQL
ORM: Sequelize
Authentication: JWT (JSON Web Tokens) for user sessions
Authorization: API Key for Admin endpoints and JWT for protected user routes
Deployment: Heroku/Postgres


## Setup Instructions
### Prerequisites
Install Node.js (v14 or above).
Install PostgreSQL.
Install a package manager like npm or yarn.
Ensure Git is installed for version control.

### Clone the Repository
```bash
git clone https://github.com/Sonugupta2001/railway-booking
cd railway-booking
```

### Install Dependencies
```bash
npm install
```

### Set Up Environment Variables
Create a .env file in the root directory and add the following variables:
```env
PORT=5000
DATABASE_URL=postgres://<username>:<password>@localhost:5432/<database_name>
JWT_SECRET=<your-jwt-secret>
ADMIN_API_KEY=<your-admin-api-key>
```

### Initialize the Database
```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

### Start the Server
```bash
npm start
```
The server will run on http://localhost:3001.

## Assumptions
A train has a fixed total number of seats.
Admin APIs are protected using an API key to prevent unauthorized access.
Race conditions during simultaneous bookings are handled using database transactions.
Only authenticated users (JWT-based) can book seats or retrieve booking details.
The database is initialized with no predefined trains or users. Admin must add trains initially.

## API Documentation

### 1. User Management
#### 1.1. Register User
Endpoint: POST /api/users/register
Description: Register a new user with user role.

Request Body:
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```
Response:
```json
{
  "message": "User registered successfully"
}
```
#### 1.2. Login User
Endpoint: POST /api/users/login
Description: Login to the system to get an access token.

Request Body:
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "<JWT-token>"
}
```

### 2. Admin Management
#### 2.1. Add New Train
Endpoint: POST /api/trains
Description: Add a new train with source, destination, and seat count.
Headers:
```json
{
  "x-api-key": "<ADMIN_API_KEY>"
}
```
Request Body:
```json
{
  "name": "Express 101",
  "source": "City A",
  "destination": "City B",
  "seats": 100
}
```

Response:
```json
{
  "message": "Train added successfully",
  "train": {
    "id": 1,
    "name": "Express 101",
    "source": "City A",
    "destination": "City B",
    "seats": 100,
    "availableSeats": 100
  }
}
```

### 3. Train Management
#### 3.1. Get Seat Availability
Endpoint: GET /api/trains?source=<source>&destination=<destination>
Description: Fetch available trains between source and destination.

Response:
```json
{
  "trains": [
    {
      "id": 1,
      "name": "Express 101",
      "source": "City A",
      "destination": "City B",
      "availableSeats": 50
    }
  ]
}
```

### 4. Booking Management
#### 4.1. Book a Seat
Endpoint: POST /api/bookings
Description: Book a seat on a specific train.

Headers:
```json
{
  "Authorization": "Bearer <JWT-token>"
}
```

Request Body:
```json
{
  "trainId": 1
}
```

Response:
```json
{
  "message": "Seat booked successfully",
  "booking": {
    "id": 101,
    "trainId": 1,
    "userId": 1,
    "status": "CONFIRMED"
  }
}
```

#### 4.2. Get Booking Details
Endpoint: GET /api/bookings/:id
Description: Retrieve details of a specific booking.

Headers:
```json
{
  "Authorization": "Bearer <JWT-token>"
}
```

Response:
```json
{
  "id": 101,
  "trainId": 1,
  "userId": 1,
  "status": "CONFIRMED",
  "train": {
    "name": "Express 101",
    "source": "City A",
    "destination": "City B"
  }
}
```

## Concurrency Handling
Database Transactions: Seat bookings are wrapped in a transaction to ensure consistency. If two users try to book simultaneously, only one will succeed based on database locks.
Optimistic Locking: Uses available seat count validation during the booking process to handle race conditions.


## Future Enhancements/Scope
Real-time notifications for booking confirmation or waitlisting.
Integration with payment gateways.
Enhanced analytics for admins to track train utilization.# railway-booking
