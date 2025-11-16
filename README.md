
🚀 Public Chat App (Express + Socket.IO)

A simple, fast, real-time public chat application built using:

Node.js

ExpressJS

Socket.IO

HTML, CSS, JavaScript

Includes username login, join/leave notifications, online user count, and full real-time messaging.

📂 Project Structure
public-chat-app/
│
├── public/
│   ├── index.html       → Username entry page
│   ├── chat.html        → Main chat UI
│   ├── style.css        → Chat styling
│   └── script.js        → Frontend logic
│
├── server.js            → Express + Socket.IO backend
├── package.json
├── .gitignore
└── README.md

🛠 Installation & Setup (Local)
git clone https://github.com/prakashverma-dev/public-chat-app.git
cd public-chat-app
npm install
npm start


Open in browser →
http://localhost:3000

✨ Features

✔ Enter username before joining
✔ Shows “User joined” / “User left”
✔ Automatically updates online user count
✔ Realtime messaging with Socket.IO
✔ Clean, simple UI
✔ Production-ready
✔ Auto-deploy supported (Render / Railway)

🚀 Deploy to Render (recommended)

Render supports full Node.js + WebSocket hosting.

1️⃣ Push project to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/public-chat-app.git
git push -u origin main

2️⃣ Deploy on Render

Go to https://render.com

Click New → Web Service

Connect your GitHub repo (public-chat-app)

Build command: npm install

Start command: npm start

Deploy

Render will give you a URL like:

https://public-chat-app.onrender.com


Open it in the browser—your chat app is live!

🚀 Deploy to Railway (alternative)

Go to https://railway.app

New Project → Deploy from GitHub

Select public-chat-app

Build: npm install

Start: npm start

Railway will give its own hosted URL.

🧩 Technologies Used
Layer	Tech
Backend	Node.js, ExpressJS
Realtime	Socket.IO
Frontend	HTML, CSS, JavaScript
Deployment	Render / Railway
💡 How It Works

User enters name → stored in localStorage

Client connects to server via Socket.IO

Client emits "new-user"

Server:

Adds user

Broadcasts "user joined"

Updates online count

Messages flow through "send-message" events

On disconnect:

Removes user

Broadcasts "user left"

Updates online count

📜 License

MIT — free for personal & commercial use.