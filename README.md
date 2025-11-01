
# 🤖 Policy Assistant | Full Stack AI Chat + Document System

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-2A2A2A?style=for-the-badge&logoColor=white)

---

## 🚀 Overview
This is a **Full Stack AI-Powered Chat and Document Management Application** that integrates multiple modules like Chat, Email, Document Ingestion, Slack Communication, and AI Text Generation using **LangChain**. 

It’s built with a **React frontend** and a **Node.js + Express + MongoDB backend**.

---

## 🧠 Features
- 💬 AI Chat Interface powered by LangChain
- 📄 Document upload and ingestion
- 🧩 History tracking for user sessions
- 📧 Email generation and management
- 🧠 Smart content generation via OpenAI or LangChain API
- 🔗 Slack integration for notifications
- 🗂 Organized backend architecture (controllers, routes, models, services)

---

## 🏗️ Tech Stack
### Frontend
- React.js
- Axios
- Modern UI Components (Custom/Material UI)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- LangChain for AI-based processing
- Multer (for file uploads)

---

## 📁 Folder Structure
```
project-root/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── langchain/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── utils/
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    ├── package.json
    └── ...
```

---

## ⚙️ Installation & Setup
Follow the steps below to set up and run the project locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Install Dependencies
#### Backend Setup
```bash
cd backend
npm install
```

#### Frontend Setup
```bash
cd ../frontend
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the `backend` folder and add:
```bash
PORT=5000
MONGO_URI=your_mongo_connection_string
OPENAI_API_KEY=your_openai_api_key
SLACK_TOKEN=your_slack_token
EMAIL_API_KEY=your_email_api_key
```

### 4️⃣ Run the Application
#### Run Backend
```bash
cd backend
npm start
```

#### Run Frontend
```bash
cd ../frontend
npm start
```

Then open **http://localhost:3000** in your browser 🎉

---

## 🧩 API Endpoints (Backend)
| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/api/chat` | POST | Handles chat messages with AI |
| `/api/generate` | POST | Generates text/drafts using AI |
| `/api/upload` | POST | Uploads and processes files |
| `/api/history` | GET | Fetches chat/document history |
| `/api/slack` | POST | Sends notifications to Slack |
| `/api/email` | POST | Sends or generates emails |

---

## 🧑‍💻 Author
**Developed by:** Momin Raza  
**Role:** Full Stack Developer  
📧 Contact: [mominraza354@gmail.com]

---

## 🌟 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License
This project is licensed under the MIT License — feel free to use and modify it.

---

> 🧠 _"Empowering workflows with AI-driven intelligence and seamless integration."_
