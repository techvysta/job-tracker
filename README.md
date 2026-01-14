📌 Job Application Tracker

A full-stack Job Application Tracker built with Next.js, MongoDB, and NextAuth that allows users to securely manage their job applications.

Each user can register, log in, and track only their own jobs, making the app multi-user and production-ready.

🚀 Features

🔐 Authentication

User registration & login

Secure sessions using NextAuth (Credentials Provider)

Protected dashboard routes

Logout functionality

🗂 Job Management (CRUD)

Add new job applications

View job list

Update job status

Delete job applications

👤 User-Specific Data

Jobs are linked to the logged-in user

Users can only access their own data

🎨 User Experience

Loading states

Empty state messages

Disabled buttons during form submission

Clean and responsive UI

🛠 Tech Stack

Frontend

Next.js (App Router)

React

Tailwind CSS

Backend

Next.js API Routes

MongoDB (Mongoose)

Authentication

NextAuth.js

Credentials Provider

bcrypt for password hashing

📂 Project Structure
app/
├── api/
│   ├── auth/[...nextauth]/route.js
│   ├── jobs/
│   │   ├── route.js
│   │   └── [id]/route.js
│   └── register/route.js
│
├── dashboard/
│   ├── page.js
│   └── DashboardClient.js
│
├── login/page.js
├── register/page.js
│
├── layout.js
├── page.js
└── globals.css

🔐 Authentication Flow

User registers on /register

Password is hashed and stored securely in MongoDB

User logs in via /login

Session is created using NextAuth

/dashboard is protected and accessible only to authenticated users

⚙️ Environment Variables

Create a .env.local file in the root directory:

MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000

▶️ Run Locally
# Install dependencies
npm install

# Start development server
npm run dev


Open:

http://localhost:3000

🌱 Future Improvements

Edit job details

Job search & filters

Pagination

Dark mode

Deployment to Vercel

📖 What I Learned

Implementing authentication with NextAuth

Secure password handling using bcrypt

Protecting routes in Next.js App Router

Building REST APIs with Next.js

Structuring a real-world full-stack application

Managing user-scoped data securely

👩‍💻 Author

Sumedha Baranwal

GitHub: https://github.com/techvysta

Role: Frontend / Full-Stack Developer

⭐ If you like this project

Give it a ⭐ on GitHub — it helps a lot!