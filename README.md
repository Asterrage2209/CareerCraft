# CareerCraft - AI-Based Career & Skills Advisor

CareerCraft is a modern, responsive web application designed to provide personalized career and skills advice using an AI-driven chat interface. It also features a curated job board to help users find their next opportunity.

---

## ✨ Features

* 🌗 **Light/Dark Mode:** Seamless theme switching for user comfort.
* 🧭 **Modern Navbar:** Easy navigation with dropdowns and conditional UI.
* 🔑 **Secure Auth:** Separate, validated pages for Sign In and Sign Up.
* 🏠 **Animated Dashboard:** A beautiful hero section and feature cards with smooth scroll animations.
* 💬 **AI Consultancy:** An interactive chat interface to get career advice. (Currently hardcoded).
* 📄 **Job Postings:** A blog-style page displaying recent, relevant job opportunities. (Currently hardcoded).
* 📱 **Fully Responsive:** Built with Tailwind CSS for a flawless experience on any device.

---

## 🛠️ Built With

* **Frontend:** React (via Vite)
* **Styling:** Tailwind CSS
* **Linting:** ESLint

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js (version 16.x or higher) and npm installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/careercraft.git](https://github.com/your-username/careercraft.git)
    cd careercraft
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Start the development server:**
    ```sh
    npm run dev
    ```

The application will now be running on `http://localhost:5173`.

---

## 📂 File Structure

The project follows a standard Vite + React structure to keep the codebase organized and scalable.

```
careercraft/
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
│
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    │
    ├── components/
    │   ├── AnimatedSection.jsx
    │   ├── Icons.jsx
    │   └── Navbar.jsx
    │
    ├── hooks/
    │   └── useOnScreen.js
    │
    └── pages/
        ├── Consultancy.jsx
        ├── Dashboard.jsx
        ├── JobPostings.jsx
        ├── SignIn.jsx
        └── SignUp.jsx
```
