# Job Portal Web Application

A modern job portal built with **React**, **Vite**, **Firebase**, and **Tailwind CSS**.  
This platform allows users to browse jobs, apply with their resume, and track application status.

---

## Features

- 🔍 Browse and search job listings
- 📄 View detailed job descriptions and benefits
- 📝 Apply for jobs with resume/CV upload (PDF, DOC, DOCX)
- 👤 User authentication (email/password & Google)
- 💾 Save jobs and track application status
- 🗂️ Profile management and resume download
- 🌙 Light/Dark mode toggle
- 📦 Cloud-ready: deploy frontend to Vercel/AWS Amplify, backend to serverless (AWS Lambda), resumes to S3, and data to managed SQL/Firestore

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, FontAwesome
- **Backend:** Firebase Firestore (can be adapted to serverless API)
- **Authentication:** Firebase Auth
- **File Uploads:** Firebase Storage or AWS S3 (configurable)
- **Email Notifications:** EmailJS
- **Deployment:** Vercel, AWS Amplify, or similar

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name/Job-Portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `Job-Portal` directory and add your Firebase and API keys:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Run the App Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

---

## Deployment

### Frontend

- **Vercel:** Import your GitHub repo and deploy (auto-detects Vite/React).
- **AWS Amplify:** Connect your repo and deploy via the Amplify Console.

### Backend & Storage

- **Firebase:** Uses Firestore and Storage by default.
- **AWS:** Adapt backend to AWS Lambda/API Gateway and use S3 for resumes.
- **Managed SQL:** Use AWS RDS or similar for relational data if needed.

---

## Folder Structure

```
Job-Portal/
  ├── public/
  ├── src/
  │   ├── api/
  │   ├── assets/
  │   ├── utils/
  │   ├── App.jsx
  │   ├── Home.jsx
  │   └── ...
  ├── db.json
  ├── package.json
  ├── tailwind.config.js
  └── vite.config.js
```

---

## Customization

- Update job seeding in `src/SeedJobs.jsx` or `src/initData.js`.
- Adjust authentication and storage in `src/firebase.js`.
- Modify styles in `src/App.css` and Tailwind config.

---

## License

MIT

---

## Credits

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [FontAwesome](https://fontawesome.com/)