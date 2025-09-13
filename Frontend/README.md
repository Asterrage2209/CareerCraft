# CareerCraft - AI-Based Career & Skills Advisor (v2)

CareerCraft is a modern, responsive web application designed to provide personalized career and skills advice. This version introduces user roles, new pages, and an enhanced authentication flow.

---

## ✨ Features

-   🌗 **Light/Dark Mode:** Seamless theme switching for user comfort.
-   🔑 **Role-Based Access:** Separate experiences for **School Students** and **College Students**.
-   🔐 **Secure Auth Flow:** Validated Sign Up and Sign In pages with protected routes.
-   👤 **User Profiles:** A dedicated page for users to edit their profile information.
-   🏠 **Animated Dashboard:** A beautiful hero section and feature cards with smooth scroll animations.
-   💬 **AI Consultancy:** An interactive chat interface to get career advice.
-   📄 **Job Postings:** A dedicated job board for college students, with individual job detail pages.
-   🎓 **College Admissions:** A resource page for school students exploring college options.
-   📱 **Fully Responsive:** Built with Tailwind CSS for a flawless experience on any device.

---

## 🛠️ Built With

-   **Frontend:** React (via Vite)
-   **Styling:** Tailwind CSS
-   **Routing:** React Router DOM
-   **Icons:** Lucide React

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js (version 16.x or higher) and npm installed on your machine.

### Installation & Setup

1.  **Navigate to the frontend directory:**
    ```sh
    cd frontend
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

###  डेमो क्रेडेंशियल्स (Demo Credentials)

Use the following credentials on the Sign In page to test the different user roles:

-   **College Student:**
    -   **Email:** `college_demo@careercraft.test`
    -   **Password:** `College123!`
-   **School Student:**
    -   **Email:** `school_demo@careercraft.test`
    -   **Password:** `School123!`

---

## 📝 Notes for Backend Team

The frontend is currently operating with hardcoded data and local state for authentication. The following areas will require backend integration:

1.  **Authentication:**
    -   The `useAuth.js` hook simulates a login/logout flow using `localStorage`. This needs to be replaced with API calls for user registration, login (issuing JWTs), and logout.
    -   The demo credentials in `SignIn.jsx` should be removed once a real auth system is in place.

2.  **User Roles:**
    -   The user's role is currently stored in `localStorage` upon login. The backend should enforce role-based access control on all relevant API endpoints. The frontend `ProtectedRoute.jsx` component should be seen as a UX enhancement, not the primary security measure.

3.  **Profile Management:**
    -   The `EditProfile.jsx` page currently updates the local state. An endpoint is needed to `GET` the current user's profile data and another to `PUT`/`PATCH` updates. Profile picture uploads will require a file storage solution (e.g., S3, Cloudinary).

4.  **Data Fetching:**
    -   The job postings (`JobPostings.jsx`) and college admissions info (`CollegeAdmissions.jsx`) are hardcoded. Endpoints are needed to fetch this data.
    -   The individual job post page (`JobPostPage.jsx`) will need an endpoint to fetch a single job by its ID.

Please add `// TODO:` comments throughout the code to mark specific places for integration.