# 🚀 Planet Media Backend (Serverless + AWS Lambda + Cognito + PostgreSQL)

This backend is a **serverless authentication system** built using:

- AWS Lambda (Serverless Framework)
- API Gateway
- AWS Cognito (Authentication & OTP)
- PostgreSQL (Database)
- TypeORM (ORM)
- Node.js + TypeScript
- Serverless Offline (local development)

---

# 🧠 System Architecture

---

# ⚙️ Tech Stack

- Node.js (v18+ recommended)
- TypeScript
- Serverless Framework v3
- AWS Lambda
- AWS API Gateway
- AWS Cognito
- PostgreSQL
- TypeORM
- Serverless Offline (local testing)

---

# 📁 Project Structure

```
src/
 ├── functions/
 │    ├── signup/
 │    ├── login/
 │    ├── verify-otp/
 │    ├── resend-otp/
 │    ├── forgot-password/
 │    ├── reset-password/
 │
 ├── services/
 ├── entities/
 ├── config/
 ├── utils/
 ├── middleware/
serverless.yml
```

---

# ⚙️ Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/ullasraj/aws_coginto_task_backend
cd aws_coginto_task_backend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create `.env` File

Create a `.env` file in root directory:

```env
AWS_REGION=ap-south-1

COGNITO_CLIENT_ID=your_cognito_client_id
COGNITO_USER_POOL_ID=your_user_pool_id

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=your_database
```

---

# 🚀 Run Project Locally

## Start Serverless Offline

```bash
npm run dev
```

Server runs at:

```
http://localhost:3000/dev
```

---

# 🚀 Deploy to AWS

```bash
npx serverless deploy
```

---

# 🔐 Authentication Flow

## 1. Signup

- User registers
- Cognito sends OTP email

## 2. Verify OTP

- User confirms email using OTP

## 3. Login

- Returns JWT tokens (Access + ID + Refresh)

## 4. Forgot Password

- Sends OTP to email

## 5. Reset Password

- Updates password using OTP

---

# 📡 API Endpoints

| Method | Endpoint              | Description    |
| ------ | --------------------- | -------------- |
| POST   | /auth/signup          | Register user  |
| POST   | /auth/verify          | Verify OTP     |
| POST   | /auth/login           | Login user     |
| POST   | /auth/resend-otp      | Resend OTP     |
| POST   | /auth/forgot-password | Send reset OTP |
| POST   | /auth/reset-password  | Reset password |

---

# ⚠️ Environment Variables Handling

If you see errors like:

```
Value not found at env source
```

### ✔ Fix:

Make sure `.env` is loaded correctly and also mapped in `serverless.yml`:

```yaml
provider:
  environment:
    AWS_REGION: ${env:AWS_REGION}
    COGNITO_CLIENT_ID: ${env:COGNITO_CLIENT_ID}
    COGNITO_USER_POOL_ID: ${env:COGNITO_USER_POOL_ID}
    DB_HOST: ${env:DB_HOST}
    DB_PORT: ${env:DB_PORT}
    DB_USERNAME: ${env:DB_USERNAME}
    DB_PASSWORD: ${env:DB_PASSWORD}
    DB_NAME: ${env:DB_NAME}
```

---

# 🔐 Cognito Setup Notes

### Required settings in AWS Cognito:

✔ Enable Authentication Flow:

- `ALLOW_USER_PASSWORD_AUTH`

✔ App Client:

- Generate Client ID
- Enable Email sign-in

✔ If using secret:

- Handle `SECRET_HASH` in backend

---

# 🧱 Common Issues & Fixes

---

## ❌ 1. CORS Error (Frontend issue)

✔ Fix in `serverless.yml`:

```yaml
cors:
  origin: "*"
  headers:
    - Content-Type
    - Authorization
```

---

## ❌ 2. Cognito Error: USER_PASSWORD_AUTH not enabled

✔ Fix:
Enable `USER_PASSWORD_AUTH` in App Client settings.

---

## ❌ 3. Missing environment variables

✔ Fix:
Ensure `.env` exists and serverless reads it via `${env:VAR}`

---

## ❌ 4. Postgres error (pg_hba.conf)

```
no pg_hba.conf entry
```

✔ Fix:

- Allow remote IP access in PostgreSQL
- Enable SSL if required

---

## ❌ 5. Serverless Offline error (ESM issue)

✔ Fix:

```bash
set NODE_OPTIONS=--no-experimental-require-module
npm run dev
```

---

# 🧪 Testing (Postman)

Base URL:

```
http://localhost:3000/dev
```

Example:

```
POST /auth/signup
POST /auth/login
```

---

# 🚀 Deployment Notes

- Each Lambda function is independent
- Deploy updates using:

```bash
npx serverless deploy
```
