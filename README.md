🎬 Full Stack Movie App

A complete MERN Stack Movie Management Application with:

👤 User login & account creation

🔐 Admin login & movie management

🎞 Users can view, sort, search & browse movies

🛠 Admins can add new movies

🍃 Backend powered by Node.js, Express & MongoDB

⚛ Frontend using React + Material UI

🔄 API-driven communication between frontend & backend

📁 Project Structure
FULL STACK MOVIE APP
│
├── backend
│   ├── controller
│   ├── db
│   ├── middleware
│   ├── routes
│   ├── Schema
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── admin
│   │   │   ├── addMovie.jsx
│   │   │   ├── createAccount.jsx
│   │   ├── user
│   │   │   ├── UserHomePage.jsx
│   │   │   ├── UserSearchPage.jsx
│   │   │   ├── createAccount.jsx
│   │   ├── pages
│   │   │   ├── adminLogin.jsx
│   │   │   ├── userLogin.jsx
│   │   │   ├── forget.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── start.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md

🚀 Features
User Features

✔ Login / Signup
✔ Browse all movies
✔ Sort by: ranking, rating, year, duration, name
✔ Search movies
✔ Pagination
✔ Beautiful UI using Material UI

Admin Features

✔ Login / Signup
✔ Add new movies (title, description, poster, rating, year, duration, etc.)
✔ All movies added appear instantly in the user section

🛠 Tech Stack
Frontend

React

Vite

Material UI (MUI)

React Router

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT (optional)

CORS, dotenv

📦 Installation & Setup
1️⃣ Clone the repository
git clone <your-repo-url>
cd FULL STACK MOVIE APP

🖥 Backend Setup
2️⃣ Install backend dependencies
cd backend
npm install

3️⃣ Create .env file
PORT=3000
MONGO_URL=your_mongodb_url_here
JWT_SECRET=your_secret_key

4️⃣ Start backend
npm start

🎨 Frontend Setup
5️⃣ Install frontend dependencies
cd ../frontend
npm install

6️⃣ Start frontend
npm run dev


Frontend runs on:

http://localhost:5173


Backend runs on:

http://localhost:3000

🔌 API Endpoints (Important)
🎬 Movies
Method	Endpoint	Description
GET	/movie/getallmovie	Get all movies
POST	/movie/addmovie	Admin adds a movie
🧑 User
Method	Endpoint	Description
POST	/user/create	User signup
POST	/user/login	User login
🛡 Admin
Method	Endpoint	Description
POST	/admin/create	Admin signup
POST	/admin/login	Admin login
📥 Example POST Body for Adding Movie (Postman)
{
  "rank": 1,
  "title": "The Shawshank Redemption",
  "year": 1994,
  "certificate": "R",
  "duration": "2h 22m",
  "rating": 9.3,
  "votes": "3.1M",
  "posterUrl": "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
  "description": "Two imprisoned men bond over several years."
}

📌 Routing Overview (Frontend)
<Route path="/" element={<Start />} />
<Route path="/adminLogin" element={<AdminLogin />} />
<Route path="/userLogin" element={<UserLogin />} />
<Route path="/createAccount" element={<CreateAccount />} />
<Route path="/createAdminAccount" element={<CreateAdminAccount />} />
<Route path="/forgetPassword" element={<ForgetPassword />} />
<Route path="/UserHomePage" element={<UserHomePage />} />
<Route path="/UserSearchPage" element={<UserSearchPage />} />
<Route path="/addmovie" element={<AddMovie />} />

💡 How the App Works
🟦 Backend

Admin adds movies → stored in MongoDB

API returns all movies

🟥 Frontend

UserHomePage fetches /movie/getallmovie

Movies show in a card list

Sorting, pagination, searching all work dynamically

🏁 Final Notes

This project is designed for:

learning MERN stack

admin/user dashboard

real API interaction

UI-focused functionality (MUI)
