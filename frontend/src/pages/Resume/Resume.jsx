import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiFetch } from "../../services/api";
import ResumeForm from "../../components/ResumeForm/ResumeForm";
import "./Resume.css";

const Resume = () => {
  const { user } = useContext(AuthContext);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const data = await apiFetch("/api/resumes/my");
        setResume(data);
      } catch (error) {
        if (error.message.includes("404") || error.message.includes("not found")) {
          setResume(null);
        } else {
          console.error("Error fetching resume:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [user]);

  if (loading) return <div className="resume-loading">Loading...</div>;
  if (!user) return <div className="resume-loading">Please login to view your resume</div>;

  return (
    <div className="resume-container">
      <h2>Your Resume</h2>
      {resume ? (
        <div className="resume-display">
          <h3>{resume.fullName}</h3>
          <p><strong>Email:</strong> {resume.email}</p>
          <p><strong>Phone:</strong> {resume.phone}</p>
          
          {resume.education && resume.education.length > 0 && (
            <div>
              <h4>Education</h4>
              {resume.education.map((edu, idx) => (
                <div key={idx}>
                  <p><strong>{edu.degree}</strong> - {edu.institution} ({edu.year})</p>
                  {edu.grade && <p>Grade: {edu.grade}</p>}
                </div>
              ))}
            </div>
          )}
          
          {resume.experience && resume.experience.length > 0 && (
            <div>
              <h4>Experience</h4>
              {resume.experience.map((exp, idx) => (
                <div key={idx}>
                  <p><strong>{exp.role}</strong> at {exp.company} ({exp.duration})</p>
                  {exp.description && <p>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
          
          {resume.skills && resume.skills.length > 0 && (
            <div>
              <h4>Skills</h4>
              <p>{resume.skills.join(", ")}</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>No resume created yet. Create one below:</p>
          <ResumeForm />
        </div>
      )}
    </div>
  );
};

export default Resume;
