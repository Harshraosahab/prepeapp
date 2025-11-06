import React, { useState, useEffect } from "react";
import "./LeaderboardTable.css";

const LeaderboardTable = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leaderboard data from backend
  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/leaderboard"); // ✅ adjust API URL as needed
        const data = await response.json();
        setLeaders(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">🏆 Leaderboard</h2>

      {loading ? (
        <div className="leaderboard-loading">Loading...</div>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, index) => (
              <tr
                key={leader._id || index}
                className="leader-row"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <td>{leader.rank || index + 1}</td>
                <td>{leader.name}</td>
                <td>{leader.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaderboardTable;
