# TravelBharat

TravelBharat is organized as a Next.js frontend and a PHP/MySQL API:

```text
frontend/                 Next.js application
backend/
  config/database.php     PDO MySQL connection
  api/                    API areas: auth, users, destinations, trips,
                          itineraries, bookings, reviews
  middleware/             CORS middleware
  database/schema.sql     Initial MySQL schema
  index.php               PHP API router
```

## Requirements

- Node.js 20+
- PHP 8+ with the PDO MySQL extension enabled
- MySQL 8+

## Configure the database

Create a MySQL database and tables by importing `backend/database/schema.sql`
with your MySQL client. Configure these environment variables for the PHP
process using `backend/.env.example` as a reference:

```text
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=travelbharat
DB_USER=root
DB_PASSWORD=your-local-password
CORS_ALLOWED_ORIGIN=http://localhost:3000
```

The PHP backend reads its configuration from the process environment; it does
not load `.env` files. Keep real credentials out of source control.

Start the API from the repository root in PowerShell:

```powershell
$env:DB_HOST = "127.0.0.1"
$env:DB_PORT = "3306"
$env:DB_NAME = "travelbharat"
$env:DB_USER = "root"
$env:DB_PASSWORD = "your-local-password"
$env:CORS_ALLOWED_ORIGIN = "http://localhost:3000"
php -S localhost:8000 -t backend backend/index.php
```

Check `http://localhost:8000/api/health` for the API and database connection
status. Database failures are logged by PHP and returned as HTTP 503 without
exposing credentials or internal error details.

## Start the frontend

```powershell
cd frontend
npm install
Copy-Item .env.example .env.local
npm run dev
```

`NEXT_PUBLIC_API_BASE_URL` in `frontend/.env.local` should point to the PHP
server (`http://localhost:8000` by default).

The API router and database schema are in place; feature-specific CRUD routes
and loading the current sample destinations into MySQL remain to be implemented.
The existing frontend continues to use its bundled sample content until those
routes are connected to the screens.
