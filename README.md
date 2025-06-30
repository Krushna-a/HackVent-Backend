# 🚀 HackVent – Full Stack Hackathon & Event Discovery Platform

HackVent is a dynamic web platform that empowers students to **discover**, **register for**, and **track hackathons and tech events** happening across colleges or cities — all in one place.

🔗 **Live Site**: [https://lnkd.in/geyckPfZ](https://lnkd.in/geyckPfZ)  
🔗 **Frontend Repo**: [HackVent-Frontend](https://github.com/Krushna-a/HackVent-Frontend)  
🔗 **Backend Repo**: [HackVent-Backend](https://github.com/Krushna-a/HackVent-Backend)

---

## 🌟 Features

- 📅 View upcoming tech events & hackathons
- 📝 Register for events directly on the platform
- 🛠️ Event creation portal for organizers
- 🔐 Secure login and protected routes
- 🖼️ Upload event banners/logos using Cloudinary
- ⚡ Smooth and fast UI powered by Vite + Tailwind

---

## 🛠️ Tech Stack

### Frontend:
- ⚛️ React.js (Vite)
- 🎨 Tailwind CSS
- 🔁 Axios
- 🌐 React Router

### Backend:
- 🟢 Node.js + Express.js
- 🍃 MongoDB + Mongoose
- 🛡️ Passport.js (with JWT strategy)
- ☁️ Cloudinary for media uploads
- 🧪 Postman for testing APIs

---

## 🔐 Authentication
- Secure user authentication using **JWT** tokens
- Role-based access: organizers vs participants
- Auth-protected routes using Passport middleware

---

## 📦 Deployment
- 🧭 **Frontend** hosted on [Vercel](https://vercel.com/)
- 🚀 **Backend** hosted on [Render](https://render.com/)

---

## 💡 Challenges We Solved

| Issue                  | Solution |
|------------------------|----------|
| File upload errors     | Integrated Cloudinary for smooth uploads |
| Auth & route protection| Used Passport.js middleware effectively |
| API sync bugs          | Handled using async/await and route testing |
| UI glitches            | Modularized components and used React hooks |

---

## 🤝 Teamwork

Big shoutout to [**Rachit Ingole**](#) for late-night debugging, clean pull requests, and epic collaboration! This project proved the power of **pair programming**, **communication**, and **real-world teamwork** 💪

---

## 📌 Screenshots

> _[Add screenshots of UI, event listings, registration form, etc.]_

---

## 📬 Feedback or Suggestions?

We’d love to hear your thoughts!  
Feel free to connect, open issues, or contribute via pull requests.

## Installation

## 🔥 Clone the Repositories

```bash
# Frontend
git clone https://github.com/Krushna-a/HackVent-Frontend.git

# Backend
git clone https://github.com/Krushna-a/HackVent-Backend.git
```

## 💻 Frontend Setup (React + Vite)

```bash
cd HackVent-Frontend
npm install  # or yarn
```

## 🔐 Frontend Environment Variables

```bash
VITE_API_URL=http://localhost:5000/api
```

## ✅ Start Frontend Dev Server

```bash
npm run dev
```

## 🧠 Backend Setup (MERN)

```bash
cd HackVent-Backend
npm install
```

## 🔐 Environment Variables

Create a ```.env``` file in the root of HackVent-Backend and add the following:
```bash
# 🌩️ Cloudinary (for image upload)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# 🔐 JWT Config
JWT_SECRET=your_jwt_secret_key

# 🛢️ MongoDB
MONGO_URI=your_mongodb_connection_string

# 🌐 CORS Origin
ORIGIN=http://localhost:5173

# 🚀 Server
PORT=5000
NODE_ENV=development

# 🔒 Session Config (if used with Passport sessions)
SESSION_SECRET=your_session_secret

```

## 🚀 Start Backend Server

```bash
npm start
```

