import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBookmark, FaCalendarAlt, FaDollarSign, FaQuestionCircle } from "react-icons/fa";
import { apiFetch } from "../../services/api";
import "./InterviewDetails.css";

const InterviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [activeTab, setActiveTab] = useState("topics");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    setInterview({
      id: id,
      company: "Google",
      role: "SDE 1",
      date: "24 Aug, 2024",
      package: "$150,000 / year",
      topics: [
        { name: "Data Structures & Algorithms", type: "Core", checked: false },
        { name: "System Design", type: "Core", checked: false },
        { name: "Behavioral Questions", type: "Important", checked: true },
        { name: "Object-Oriented Design", type: "Core", checked: false },
      ],
      pastQuestions: [
        "Reverse a linked list.",
        "Find the median of two sorted arrays.",
        "Design a URL shortening service."
      ],
      tips: [
        "Clearly explain your thought process.",
        "Discuss trade-offs for different solutions.",
        "Prepare stories for behavioral questions using the STAR method."
      ]
    });
    setLoading(false);
  }, [id]);

  if (loading) return <div className="interview-loading">Loading...</div>;
  if (!interview) return <div className="interview-error">Interview not found</div>;

  return (
    <div className="interview-details-container">
      <div className="interview-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <h1>Interview Details</h1>
        <button className="bookmark-btn">
          <FaBookmark />
        </button>
      </div>

      <div className="interview-overview-card">
        <div className="company-logo">
          <div className="logo-placeholder">{interview.company.charAt(0)}</div>
        </div>
        <div className="interview-info">
          <div className="interview-meta-info">
            <span><FaCalendarAlt /> Interview on {interview.date}</span>
            <span><FaDollarSign /> {interview.package}</span>
            <span><FaQuestionCircle /> FAQ Available</span>
          </div>
          <h2>{interview.company} - {interview.role}</h2>
          <p className="paq-notice">
            Complete your Placement Assessment Questionnaire (PAQ) for tailored tips.
          </p>
        </div>
      </div>

      <div className="interview-actions">
        <button className="btn-full-mock" onClick={() => navigate(`/quiz?interview=${id}`)}>
          Start Full Mock
        </button>
        <button className="btn-practice-rounds" onClick={() => navigate(`/practice`)}>
          Practice Rounds
        </button>
        <button className="btn-add-note">
          Add Note
        </button>
      </div>

      <div className="interview-tabs">
        <button
          className={`tab-btn ${activeTab === "topics" ? "active" : ""}`}
          onClick={() => setActiveTab("topics")}
        >
          Topics Required
        </button>
        <button
          className={`tab-btn ${activeTab === "questions" ? "active" : ""}`}
          onClick={() => setActiveTab("questions")}
        >
          Past Questions
        </button>
        <button
          className={`tab-btn ${activeTab === "tips" ? "active" : ""}`}
          onClick={() => setActiveTab("tips")}
        >
          Candidate Tips
        </button>
      </div>

      <div className="interview-content">
        {activeTab === "topics" && (
          <div className="topics-list">
            {interview.topics.map((topic, idx) => (
              <div key={idx} className="topic-item">
                <input
                  type="checkbox"
                  checked={topic.checked}
                  onChange={() => {
                    const updated = {...interview};
                    updated.topics[idx].checked = !updated.topics[idx].checked;
                    setInterview(updated);
                  }}
                />
                <span className="topic-name">{topic.name}</span>
                <span className={`topic-type ${topic.type.toLowerCase()}`}>{topic.type}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "questions" && (
          <div className="past-questions">
            <ul>
              {interview.pastQuestions.map((question, idx) => (
                <li key={idx}>{question}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "tips" && (
          <div className="candidate-tips">
            <ul>
              {interview.tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewDetails;

