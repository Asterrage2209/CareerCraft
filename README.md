# CareerCraft 🚀

CareerCraft is a modern, AI-powered career guidance platform that helps students and professionals navigate their career paths through personalized consultancy, job opportunities, and educational resources.

🌐 **Live Demo:** [CareerCraft Web App](https://careercraft-1-if2x.onrender.com/)

## ✨ Features

* 🤖 **AI Consultancy:** Interactive chat interface for personalized career advice
* 🔐 **Secure Authentication:** Complete user authentication system with MongoDB
* 💼 **Job Board:** Curated job postings and opportunities
* 🎓 **College Admissions:** Guidance for educational pathways
* 👤 **Profile Management:** Personalized user profiles and settings
* 🌗 **Light/Dark Mode:** Seamless theme switching for user comfort
* 📱 **Fully Responsive:** Optimized experience across all devices

## 🛠️ Tech Stack

### Frontend
- React.js (via Vite)
- Tailwind CSS
- React Router
- Modern UI Components

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## 🚀 Development Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/CareerCraft.git
cd CareerCraft
```

2. **Install Dependencies**
```bash
# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install
```

3. **Environment Setup**

Create `.env` files in both Backend and Frontend directories:

Backend/.env:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
NODE_ENV=development
```

Frontend/.env:
```
VITE_API_URL=http://localhost:5000/api
```

4. **Start Development Servers**
```bash
# Start Backend Server
cd Backend
npm start

# Start Frontend Development Server
cd Frontend
npm run dev
```

## 📂 Project Structure

```
CareerCraft/
├── Backend/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── pages/
    │   ├── utils/
    │   ├── App.jsx
    │   └── main.jsx
    └── index.html
```

## ⏳ Current Status

- ✅ User Authentication System
- ✅ Basic AI Consultancy
- ✅ Job Postings
- ✅ Live Deployment
- ⏳ Advanced AI Features (Coming Soon)
- ⏳ Resume Builder (In Development)
- ⏳ Interview Preparation Module (In Development)

## 🤝 Contributing

We welcome contributions! Feel free to submit issues and pull requests.

## 📫 Feedback & Bug Reports

Found a bug or have a suggestion? Please email us at slapandya1407@gmail.com

