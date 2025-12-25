# Quiz Application 🚀

A secure, fullscreen-based **Quiz Application** built using **React**, **Supabase**, and **Redux**, designed to prevent cheating and provide a smooth assessment experience. The application includes authentication, topic-based quizzes, real-time scoring, and progress tracking with a modern UI powered by **Ant Design**.

---

## 📌 Features

### 🔐 Authentication
- User **Signup & Login** using Supabase Auth
- Secure session handling
- Auth-protected routes

### 📚 Topics & Quiz Flow
- Topics listing page
- Topic-based questions and options
- One quiz attempt per topic (can be enforced via backend)

### 🧠 Quiz System
- Multiple-choice questions
- Answer selection with validation
- Previous / Next navigation
- Progress indicator
- Final score calculation

### 🛡️ Anti-Cheating & Security
- **Fullscreen mode is mandatory**
- Quiz pauses and shows warning if fullscreen is exited
- Option to cancel quiz if fullscreen is not resumed
- User cannot switch tabs or exit fullscreen unnoticed
- Quiz auto-handles fullscreen enter/exit using browser Fullscreen API

### 🎨 UI / UX
- Built using **Ant Design**
- Responsive and modern UI
- Loading states and feedback messages
- Result screen with pass/fail status

---

## 🛠️ Tech Stack

### Frontend
- **React (TypeScript)**
- **Redux Toolkit** (state management)
- **React Router DOM**
- **Ant Design**
- **Tailwind CSS** (for layout and styling)

### Backend / Services
- **Supabase**
  - Authentication
  - Database (PostgreSQL)
  - Secure API access

---

## 🗂️ Project Structure

