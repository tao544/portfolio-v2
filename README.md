# 🚀 DevwithTao — Full Stack Portfolio





<div align="center">

![DevwithTao](https://img.shields.io/badge/DevwithTao-Portfolio-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Deployed](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**A premium full-stack developer portfolio with a live admin dashboard, MongoDB backend, and Cloudinary CV management.**

[🌐 Live Site](https://portfolio-v2-theta-one-81.vercel.app) · [🔐 Admin Panel](https://portfolio-v2-theta-one-81.vercel.app/admin/login) · [📧 Contact](mailto:adepojutaoheed23@gmail.com)

</div>

---

## 📸 Screenshots

![Home Page](./screenshots/home.png)
![Projects Page](./screenshots/project.png)
![Admin Dashboard](./screenshots/admin.png)

---


## ✨ Features

| Feature | Description |
|---|---|
| 🎨 Premium UI | Glassmorphism navbar, Framer Motion page transitions |
| 🌙 Dark / Light Mode | Toggles instantly, persists across sessions |
| ⌨️ Typing Animation | Rotating developer titles on hero section |
| 📊 Skills Section | Categorized tabs with animated progress bars + Devicon icons |
| 🃏 Project Cards | Slide-up overlay with status badges and Live Demo links |
| 🔍 Project Filters | Filter by category (Frontend / Full Stack) with load more |
| 📧 Contact Form | EmailJS — sends real emails directly to inbox |
| 📄 Dynamic CV | Upload, replace or remove CV from admin dashboard |
| 🔐 Admin Dashboard | Password-protected — add, edit, delete, feature projects |
| 📱 Fully Responsive | Mobile, tablet, and desktop optimized |

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat-square&logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white)

### Services & Hosting
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)
![EmailJS](https://img.shields.io/badge/EmailJS-FF6B6B?style=flat-square&logo=gmail&logoColor=white)

---

## 📁 Project Structure

```
portfolio-v2/                   # Frontend — React + Vite
├── public/
│   ├── favicon.png
│   └── images/                 # Profile photos, project screenshots
├── src/
│   ├── admin/
│   │   ├── AdminDashboard.jsx  # Main admin UI
│   │   ├── AdminLogin.jsx      # Password-protected login
│   │   ├── ProjectFormModal.jsx# Add/edit project modal
│   │   └── ProtectedRoute.jsx  # Route guard
│   ├── animations/
│   │   └── variants.js         # Framer Motion configs
│   ├── components/
│   │   ├── Navbar.jsx          # Glassmorphism navbar
│   │   └── Footer.jsx
│   ├── context/
│   │   ├── AuthContext.jsx     # Admin auth state
│   │   ├── ProjectsContext.jsx # Projects state + API calls
│   │   └── ThemeContext.jsx    # Dark/light mode
│   ├── data/
│   │   └── projects.js         # Fallback static data
│   ├── pages/
│   │   ├── Home.jsx            # Hero, skills, featured projects
│   │   ├── About.jsx
│   │   ├── Projects.jsx        # Full projects grid
│   │   ├── Services.jsx
│   │   └── Contact.jsx         # EmailJS form
│   └── services/
│       └── api.js              # All backend API calls

server/                         # Backend — Node.js + Express
├── config/
│   └── cloudinary.js           # Cloudinary + Multer setup
├── middleware/
│   └── auth.js                 # Admin secret key guard
├── models/
│   ├── Project.js              # Mongoose project schema
│   └── Settings.js             # CV URL storage schema
├── routes/
│   ├── projects.js             # CRUD /api/projects
│   └── settings.js             # CV upload /api/settings
└── index.js                    # Express server entry
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free)
- Cloudinary account (free)
- EmailJS account (free)

### 1. Clone the repos

```bash
git clone https://github.com/tao544/portfolio-v2.git
git clone https://github.com/tao544/portfolio-backend.git
```

### 2. Setup Frontend

```bash
cd portfolio-v2
npm install
```

Create `.env` in `portfolio-v2/`:
```env
VITE_API_URL=http://localhost:5000
VITE_ADMIN_SECRET=your_admin_secret
VITE_ADMIN_PASSWORD=your_admin_password
```

```bash
npm run dev
```

### 3. Setup Backend

```bash
cd portfolio-backend
npm install
```

Create `.env` in `server/`:
```env
MONGODB_URI=your_mongodb_connection_string
ADMIN_SECRET=your_admin_secret
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

```bash
npm run dev
```

### 4. Seed the database (optional)

```bash
cd portfolio-backend
node seed.js
```

---

## 🌐 Deployment

| Service | Platform | Purpose |
|---|---|---|
| Frontend | Vercel | Auto-deploys from GitHub |
| Backend | Render | Auto-deploys from GitHub |
| Database | MongoDB Atlas | Cloud hosted |
| Files | Cloudinary | CV + media storage |

### Deploy Frontend (Vercel)
1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy ✅

### Deploy Backend (Render)
1. Push to GitHub
2. Create Web Service on [render.com](https://render.com)
3. Set build command: `npm install`
4. Set start command: `node index.js`
5. Add environment variables in Render dashboard
6. Deploy ✅

---

## 🔐 Admin Dashboard

The admin panel is not publicly linked — only accessible via direct URL:

```
https://your-portfolio.vercel.app/admin/login
```

**Admin capabilities:**
- ➕ Add new projects with full details
- ✏️ Edit existing projects
- 🗑️ Delete projects (with confirmation)
- ⭐ Toggle featured status
- 🔄 Change project status (Planning / In Progress / Completed)
- 📄 Upload / Replace / Remove CV via Cloudinary

---

## 📬 Contact

**Taoheed Adepoju** — Full Stack Developer based in Lagos, Nigeria 🇳🇬

[![Email](https://img.shields.io/badge/Email-adepojutaoheed23@gmail.com-red?style=flat-square&logo=gmail)](mailto:adepojutaoheed23@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Taoheed_Adepoju-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/taoheed-adepoju-72839122b)
[![GitHub](https://img.shields.io/badge/GitHub-tao544-black?style=flat-square&logo=github)](https://github.com/tao544)
[![Portfolio](https://img.shields.io/badge/Portfolio-DevwithTao-6366f1?style=flat-square)](https://portfolio-v2-theta-one-81.vercel.app)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Built with ❤️ by **DevwithTao** · Lagos, Nigeria 🇳🇬

⭐ **Star this repo if you found it helpful!**

</div>
