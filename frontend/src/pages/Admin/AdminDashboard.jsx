import React, { useState } from "react";
import "./Admin.css";
import ManageUsers from "./ManageUsers";
import ManageQuizzes from "./ManageQuizzes";
import ManageResumes from "./ManageResumes";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="dashboard-layout">
      {/* === Sidebar === */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-menu">
          <li onClick={() => setActiveTab("users")} className={activeTab === "users" ? "active" : ""}>Users</li>
          <li onClick={() => setActiveTab("quizzes")} className={activeTab === "quizzes" ? "active" : ""}>Quizzes</li>
          <li onClick={() => setActiveTab("resumes")} className={activeTab === "resumes" ? "active" : ""}>Resumes</li>
        </ul>
      </aside>

      {/* === Main Content === */}
      <main className="main-content">
        <div className="admin-dashboard">
          <div className="admin-tabs">
            <button
              className={activeTab === "users" ? "active" : ""}
              onClick={() => setActiveTab("users")}
            >
              Manage Users
            </button>
            <button
              className={activeTab === "quizzes" ? "active" : ""}
              onClick={() => setActiveTab("quizzes")}
            >
              Manage Quizzes
            </button>
            <button
              className={activeTab === "resumes" ? "active" : ""}
              onClick={() => setActiveTab("resumes")}
            >
              Manage Resumes
            </button>
          </div>

          <div className="admin-content">
            {activeTab === "users" && <ManageUsers />}
            {activeTab === "quizzes" && <ManageQuizzes />}
            {activeTab === "resumes" && <ManageResumes />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
