# CodeFeast Admin Backend

A Node.js and Express-based backend for the CodeFeast Admin Panel, providing admin authentication and protected APIs.

---

## 🚀 Features

- Admin Signup & Login
- JWT Authentication
- Protected Routes
- MongoDB with Mongoose
- Password Hashing with Bcrypt

---

## 🛠️ Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-repo/codefeast-admin-backend.git
cd codefeast-admin-backend

# 2. Install dependencies
npm install

# 3. Add a .env file


# 4. Start the server
npm run dev   # for development
# or
npm start     # for production
````

---

## 📌 API Endpoints

| Method | Endpoint                   | Description                   |
| ------ | -------------------------- | ----------------------------- |
| POST   | `/api/admin/signup`        | Admin Signup                  |
| POST   | `/api/admin/login`         | Admin Login                   |
| GET    | `/api/admin/admin-details` | Get Admin Details (Protected) |

---

## 📂 Project Structure

```bash
codefeast-admin-backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── .env.example
├── server.js
└── package.json
```

---

## 📦 Dependencies

* express
* mongoose
* bcryptjs
* jsonwebtoken
* dotenv

---

## 📝 License

MIT
