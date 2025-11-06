import React, { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import "./Admin.css";

const ManageQuizzes = ({ apiEndpoint }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const data = await apiFetch(apiEndpoint || "/api/admin/quizzes");
        setQuizzes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch quizzes", err);
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [apiEndpoint]);

  if (loading) return <div>Loading quizzes...</div>;

  return (
    <div className="manage-section">
      <h3>Quizzes</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Questions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.length === 0 ? (
            <tr>
              <td colSpan="4">No quizzes found</td>
            </tr>
          ) : (
            quizzes.map((quiz) => (
              <tr key={quiz._id || quiz.id} className="fade-in">
                <td>{quiz.title}</td>
                <td>{quiz.difficulty || "Medium"}</td>
                <td>{quiz.questions?.length || 0}</td>
                <td>
                  <button className="btn-edit">Edit</button>
                  <button className="btn-delete">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageQuizzes;
