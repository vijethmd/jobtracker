# 📊 Job Application Tracker

A modern, full-stack web application for tracking job applications with a clean Kanban-style board interface. Built with the MERN stack and session-based authentication.

![Tech Stack](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

## ✨ Features

### 🔐 Authentication
- Session-based authentication (no JWT)
- Secure password hashing with bcrypt
- HTTP-only cookies for session management
- Protected routes and API endpoints

### 📋 Job Management
- Add, edit, and delete job applications
- Track applications through 4 statuses:
  - 🔵 Applied
  - 🟡 Interview
  - 🟢 Offer
  - 🔴 Rejected
- Rich job details (company, role, location, salary, notes)
- Application date tracking

### 📊 Dashboard
- Real-time statistics:
  - Total applications
  - Status-wise breakdown
  - Success rate calculation
- Visual Kanban board
- Search and filter functionality

### 🔍 Search & Filter
- Search by company or role
- Filter by status and job type
- Date range filtering
- Real-time results

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **express-session** - Session management
- **connect-mongo** - MongoDB session store
- **Joi** - Input validation
- **bcryptjs** - Password hashing

### Frontend
- **React.js** - UI library (functional components)
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS** - Styling (no framework needed)

## 📁 Project Structure

```
job-tracker/
├── backend/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── session.js           # Session configuration
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Job.js               # Job schema
│   ├── routes/
│   │   ├── auth.routes.js       # Auth endpoints
│   │   └── job.routes.js        # Job CRUD endpoints
│   ├── middleware/
│   │   ├── auth.middleware.js   # Auth protection
│   │   └── validation.middleware.js  # Joi validation
│   ├── validators/
│   │   ├── auth.validator.js    # Auth schemas
│   │   └── job.validator.js     # Job schemas
│   ├── controllers/
│   │   ├── auth.controller.js   # Auth logic
│   │   └── job.controller.js    # Job logic
│   ├── utils/
│   │   └── constants.js         # App constants
│   └── server.js                # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Auth/            # Login, Signup
    │   │   ├── Dashboard/       # Dashboard, Stats
    │   │   ├── Jobs/            # JobBoard, JobCard, JobForm
    │   │   ├── Layout/          # Navbar, PrivateRoute
    │   │   └── common/          # Reusable components
    │   ├── services/
    │   │   ├── api.js           # Axios config
    │   │   ├── auth.service.js  # Auth API calls
    │   │   └── job.service.js   # Job API calls
    │   ├── context/
    │   │   └── AuthContext.jsx  # Auth state
    │   ├── App.jsx
    │   └── index.jsx
    └── public/
        └── index.html
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd job-tracker
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# MONGODB_URI=mongodb://localhost:27017/job-tracker
# SESSION_SECRET=your-secret-key
# PORT=5000
# CLIENT_URL=http://localhost:3000
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install

# Create .env file
cp .env.example .env

# Edit .env
# REACT_APP_API_URL=http://localhost:5000/api
```

### Running the Application

1. **Start MongoDB** (if running locally)
```bash
mongod
```

2. **Start Backend Server**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

3. **Start Frontend**
```bash
cd frontend
npm start
# App opens on http://localhost:3000
```

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/signup       # Register new user
POST   /api/auth/login        # Login user
POST   /api/auth/logout       # Logout user
GET    /api/auth/me           # Get current user
```

### Jobs (Protected)
```
GET    /api/jobs              # Get all user jobs (with filters)
GET    /api/jobs/stats        # Get dashboard statistics
GET    /api/jobs/:id          # Get single job
POST   /api/jobs              # Create new job
PUT    /api/jobs/:id          # Update job
DELETE /api/jobs/:id          # Delete job
```

### Query Parameters for GET /api/jobs
- `status` - Filter by status
- `jobType` - Filter by job type
- `company` - Filter by company name
- `role` - Filter by role
- `search` - Search across company and role
- `startDate` - Filter by application date (from)
- `endDate` - Filter by application date (to)

## 🔒 Security Features

- **Session-based authentication** - Secure, HTTP-only cookies
- **Password hashing** - bcrypt with salt rounds
- **Input validation** - Joi schemas on all inputs
- **Protected routes** - Middleware authentication checks
- **CORS configuration** - Restricted to trusted origins
- **Error handling** - Proper error messages without leaking data

## 🎨 UI Features

- **Responsive design** - Works on desktop, tablet, and mobile
- **Status color coding**:
  - Applied → Blue (#3B82F6)
  - Interview → Yellow (#F59E0B)
  - Offer → Green (#10B981)
  - Rejected → Red (#EF4444)
- **Clean typography** - System fonts for optimal performance
- **Smooth transitions** - Polished user experience
- **Loading states** - Clear feedback during operations
- **Error handling** - User-friendly error messages

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/job-tracker
SESSION_SECRET=your-super-secret-session-key
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🧪 Testing the Application

1. **Sign up** for a new account
2. **Add job applications** with details
3. **Filter and search** to find specific jobs
4. **Update status** by moving jobs through the pipeline
5. **Edit jobs** to update details
6. **Delete jobs** when no longer needed
7. **View statistics** on the dashboard

## 🚀 Production Deployment

### Backend
1. Set `NODE_ENV=production` in environment
2. Use a strong `SESSION_SECRET`
3. Configure MongoDB Atlas or production database
4. Enable HTTPS
5. Set secure cookie options

### Frontend
```bash
npm run build
# Deploy the build folder to your hosting service
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ by [Your Name]

## 🙏 Acknowledgments

- MongoDB for the excellent database
- Express.js for the robust backend framework
- React for the powerful UI library
- The open-source community

---

**Happy Job Hunting! 🎯**
