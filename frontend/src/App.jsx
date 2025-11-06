import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { apiFetch } from "./services/api";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import QuizCard from "./components/QuizCard/QuizCard";
import ResumeForm from "./components/ResumeForm/ResumeForm";
import Loader from "./components/Loader/Loader";
import Notification from "./components/Notification/Notification";
import AdminSidebar from "./components/AdminSidebar/AdminSidebar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Quiz from "./pages/Quiz/Quiz";
import QuizResult from "./pages/QuizResult/QuizResult";
import Practice from "./pages/Practice/Practice";
import Resume from "./pages/Resume/Resume";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Feedback from "./pages/Feedback/Feedback";

// ✅ New imports
import Notifications from "./pages/Notifications/Notifications";
import Contact from "./pages/Contact/Contact";
import InterviewDetails from "./pages/Interviews/InterviewDetails";

// ✅ Admin imports
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageQuizzes from "./pages/Admin/ManageQuizzes";
import ManageResumes from "./pages/Admin/ManageResumes";

import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [quizzes, setQuizzes] = useState([]);
  const [leaderboardUsers, setLeaderboardUsers] = useState([]);
  const [, setActivePage] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await apiFetch("/api/quizzes");
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const data = await apiFetch("/api/leaderboard");
        setLeaderboardUsers(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchQuizzes();
    fetchLeaderboard();
  }, []);

  const simulateAction = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNotification({ type: "success", message: "Data loaded successfully!" });
    }, 2000);
  };

  const HomeContent = () => (
    <>
      <section className="hero">
        <h1>Welcome to Placement Prep Platform</h1>
        <p>
          Your all-in-one solution for placement preparation — practice quizzes,
          build your resume, and get ready for interviews.
        </p>
        <button className="btn-login" onClick={simulateAction}>
          Simulate Action
        </button>
      </section>

      <section className="quiz-section">
        <h2>Practice Quizzes</h2>
        <div className="quiz-container">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz._id || quiz.id}
              quizId={quiz._id || quiz.id}
              title={quiz.title}
              description={quiz.description}
              difficulty={quiz.difficulty}
              questions={quiz.questions}
            />
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2>Build Your Resume</h2>
        <ResumeForm />
      </section>
    </>
  );

  return (
    <div className="app">
      <Navbar
        onNavigate={(page) => {
          setActivePage(page);
          navigate(`/${page === "home" ? "" : page}`);
        }}
      />

      <main className="content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomeContent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz-result" element={<QuizResult />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/leaderboard" element={<Leaderboard users={leaderboardUsers} />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/interviews/:id" element={<InterviewDetails />} />
          <Route
            path="/contact"
            element={
              <Contact
                onSubmit={async (data) => {
                  try {
                    const response = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(data),
                    });
                    if (!response.ok) throw new Error("Failed to send message");
                    alert("Message sent successfully!");
                  } catch (error) {
                    console.error(error);
                    alert("Error sending message!");
                  }
                }}
              />
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <section className="admin-section">
                <div className="admin-container">
                  <AdminSidebar onSelect={(page) => {
                    setActivePage(page);
                    if (page === "logout") {
                      localStorage.removeItem("token");
                      navigate("/login");
                    } else {
                      navigate(`/admin/${page}`);
                    }
                  }} />
                  <div className="admin-content">
                    <Routes>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="users" element={<ManageUsers apiEndpoint="/api/admin/users" />} />
                      <Route path="quizzes" element={<ManageQuizzes apiEndpoint="/api/admin/quizzes" />} />
                      <Route path="resumes" element={<ManageResumes apiEndpoint="/api/admin/resumes" />} />
                    </Routes>
                  </div>
                </div>
              </section>
            }
          />
        </Routes>
      </main>

      <Footer />

      {loading && <Loader />}
      <Notification
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification({ type: "", message: "" })}
      />
    </div>
  );
};

export default App;
