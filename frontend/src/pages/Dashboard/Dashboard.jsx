import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { apiFetch } from "../../services/api";
import { FaChartLine, FaCalendarAlt, FaTrophy, FaArrowRight, FaPlus } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch practice stats
        const practices = await apiFetch("/api/practice");
        const totalPractices = practices.length;
        const totalQuestions = practices.reduce((sum, p) => sum + (p.totalQuestions || 0), 0);
        const correctAnswers = practices.reduce((sum, p) => sum + (p.correctAnswers || 0), 0);
        const avgScore = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
        
        // Calculate latest score
        const latestPractice = practices.length > 0 ? practices[0] : null;
        const latestScore = latestPractice && latestPractice.totalQuestions > 0
          ? Math.round((latestPractice.correctAnswers / latestPractice.totalQuestions) * 100)
          : 0;

        // Get upcoming date (mock next practice)
        const upcomingDate = new Date();
        upcomingDate.setDate(upcomingDate.getDate() + 15);

        setStats({
          recentInterviews: totalPractices,
          upcomingMock: upcomingDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          latestScore: latestScore,
          avgScore: avgScore,
        });

        // Mock interviews data (will be replaced with real API later)
        setInterviews([
          {
            id: 1,
            role: "Software Engineer",
            type: "Intern",
            company: "Google",
            date: "15 Dec 2023",
            package: "$120k",
            tags: ["On-campus", "SDE"]
          },
          {
            id: 2,
            role: "Product Manager",
            company: "Microsoft",
            date: "15 Dec 2023",
            package: "$110k",
            tags: ["PM"]
          },
          {
            id: 3,
            role: "Data Analyst",
            company: "Amazon",
            date: "20 Dec 2023",
            package: "$95k",
            tags: ["Technical Round"]
          },
          {
            id: 4,
            role: "UX Designer",
            company: "Figma",
            date: "22 Dec 2023",
            package: "$105k",
            tags: ["Off-campus", "Design"]
          }
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setStats({
          recentInterviews: 0,
          upcomingMock: "No upcoming mocks",
          latestScore: 0,
          avgScore: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (!user) return <div className="dashboard-loading">Please login to view dashboard</div>;
  if (!stats) return <div className="dashboard-loading">Loading stats...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user.name?.split(' ')[0] || user.email?.split('@')[0] || "User"}!</h1>
        <p>Ready to ace your next interview? Let's get started.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Recent Interviews</span>
            <div className="stat-card-icon">
              <FaChartLine />
            </div>
          </div>
          <div className="stat-card-value">{stats.recentInterviews}</div>
          <a href="#interviews" className="stat-card-link">
            View All <FaArrowRight />
          </a>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Upcoming Mock</span>
            <div className="stat-card-icon">
              <FaCalendarAlt />
            </div>
          </div>
          <div className="stat-card-value" style={{ fontSize: '1.8rem' }}>{stats.upcomingMock}</div>
          <a href="#schedule" className="stat-card-link">
            View Schedule <FaArrowRight />
          </a>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Latest Score</span>
            <div className="stat-card-icon">
              <FaTrophy />
            </div>
          </div>
          <div className="stat-card-value">{stats.latestScore}%</div>
          <a href="#report" className="stat-card-link">
            View Report <FaArrowRight />
          </a>
        </div>
      </div>

      <div className="interviews-section" id="interviews">
        <div className="section-header">
          <h2>My Interviews</h2>
          <a href="#all" className="view-all-link">View All →</a>
        </div>

        <div className="interview-filters">
          <select className="filter-select">
            <option>Role</option>
            <option>Software Engineer</option>
            <option>Product Manager</option>
            <option>Data Analyst</option>
          </select>
          <select className="filter-select">
            <option>Date Range</option>
            <option>Last Week</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
          </select>
          <select className="filter-select">
            <option>Package</option>
            <option>$90k - $110k</option>
            <option>$110k - $130k</option>
            <option>$130k+</option>
          </select>
          <button className="add-interview-btn" onClick={() => navigate('/interviews/add')}>
            <FaPlus /> Add Interview
          </button>
        </div>

        <div className="interviews-grid">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="interview-card"
              onClick={() => navigate(`/interviews/${interview.id}`)}
            >
              <div className="interview-card-header">
                <div className="interview-icon">
                  {interview.role.charAt(0)}
                </div>
                <div className="interview-info">
                  <h3>{interview.role} {interview.type && `- ${interview.type}`}</h3>
                  <p>{interview.company}</p>
                </div>
              </div>
              <div className="interview-meta">
                <span className="interview-date">{interview.date}</span>
                <span className="interview-package">{interview.package}</span>
              </div>
              <div className="interview-tags">
                {interview.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`tag ${
                      tag.includes('On-campus') ? 'tag-on-campus' :
                      tag.includes('Off-campus') ? 'tag-off-campus' :
                      tag === 'SDE' ? 'tag-sde' :
                      tag === 'PM' ? 'tag-pm' :
                      'tag-technical'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
