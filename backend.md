# Backend Documentation: Real Estate API

The backend is a Node.js and Express server that provides a RESTful API for the Real Estate application.

## 🚀 Getting Started
1. `cd backend`
2. `npm install`
3. Configure `.env` with `MONGODB_URI` and `JWT_SECRET`.
4. `node seed.js` (to initialize data)
5. `node index.js`

## 📦 Key Dependencies
- **Express**: Web framework for Node.js.
- **Mongoose**: ODM for MongoDB.
- **JSON Web Tokens (JWT)**: For secure authentication.
- **BcryptJS**: For hashing passwords.
- **CORS**: To enable cross-origin requests.
- **Dotenv**: For environment variable management.

## 📂 Directory Structure
- `config/db.js`: MongoDB connection setup.
- `models/`: Mongoose schemas for `Content` and `User`.
- `controllers/`: Request handlers and business logic.
- `routes/`: Express router definitions.
- `middleware/`: Custom middleware, including `auth.js` for JWT verification.

## 🔐 Authentication
- Admin authentication is handled using JWT.
- Tokens are issued upon successful login at `/api/auth/login`.
- Protected routes (e.g., updating content) require a valid token in the `Authorization` header.

## 📊 Database Models
### User
- `email`: Unique identifier for admin login.
- `password`: Hashed password.

### Content
- `section`: Identifier for the content block (e.g., 'hero', 'overview').
- `data`: Flexible object containing the content for that section.

## 📡 API Endpoints
### Auth
- `POST /api/auth/login`: Authenticate admin and return token.

### Content
- `GET /api/content`: Fetch all site content.
- `PUT /api/content/:section`: Update specific section content (Protected).
