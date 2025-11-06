import React, { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import "./Admin.css";

const ManageResumes = ({ apiEndpoint }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        setLoading(true);
        const data = await apiFetch(apiEndpoint || "/api/admin/resumes");
        setResumes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch resumes", err);
        setResumes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, [apiEndpoint]);

  if (loading) return <div>Loading resumes...</div>;

  return (
    <div className="manage-section">
      <h3>Resumes</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resumes.length === 0 ? (
            <tr>
              <td colSpan="4">No resumes found</td>
            </tr>
          ) : (
            resumes.map((resume) => (
              <tr key={resume._id || resume.id} className="fade-in">
                <td>{resume.user?.name || resume.user?.email || "N/A"}</td>
                <td>{resume.fullName || "N/A"}</td>
                <td>{resume.email || "N/A"}</td>
                <td>
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

export default ManageResumes;
