import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiFetch } from "../../services/api";
import "./Feedback.css";

const Feedback = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("Please login to submit feedback");
      return;
    }
    
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await apiFetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify({ message, rating }),
      });
      setMessage("");
      setRating(5);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError(error.message || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="feedback-section">
      <h2>Submit Feedback</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Feedback submitted successfully!</p>}
      <form className="feedback-form" onSubmit={handleSubmit}>
        <label>
          Rating (1-5):
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            required
          />
        </label>
        <textarea
          placeholder="Your Feedback"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </section>
  );
};

export default Feedback;
