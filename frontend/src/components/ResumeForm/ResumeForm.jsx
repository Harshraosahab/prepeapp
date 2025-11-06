import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiFetch } from "../../services/api";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./ResumeForm.css";

const ResumeForm = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: [],
    experience: [],
    skills: [],
  });
  const [educationInput, setEducationInput] = useState({ degree: "", institution: "", year: "", grade: "" });
  const [experienceInput, setExperienceInput] = useState({ company: "", role: "", duration: "", description: "" });
  const [skillsInput, setSkillsInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const addEducation = () => {
    if (educationInput.degree && educationInput.institution) {
      setFormData({
        ...formData,
        education: [...formData.education, { ...educationInput }],
      });
      setEducationInput({ degree: "", institution: "", year: "", grade: "" });
    }
  };

  const addExperience = () => {
    if (experienceInput.company && experienceInput.role) {
      setFormData({
        ...formData,
        experience: [...formData.experience, { ...experienceInput }],
      });
      setExperienceInput({ company: "", role: "", duration: "", description: "" });
    }
  };

  const handleSkillsChange = (e) => {
    setSkillsInput(e.target.value);
  };

  const addSkills = () => {
    if (skillsInput.trim()) {
      const skillsArray = skillsInput.split(",").map(s => s.trim()).filter(s => s);
      setFormData({
        ...formData,
        skills: [...formData.skills, ...skillsArray],
      });
      setSkillsInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("Please login to create a resume");
      return;
    }
    
    setSubmitted(true);
    setError("");

    try {
      const resumeData = {
        ...formData,
        email: formData.email || user.email,
        skills: skillsInput.trim() ? [...formData.skills, ...skillsInput.split(",").map(s => s.trim()).filter(s => s)] : formData.skills,
      };
      
      await apiFetch("/api/resumes", {
        method: "POST",
        body: JSON.stringify(resumeData),
      });
      
      alert("Resume Created Successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        education: [],
        experience: [],
        skills: [],
      });
      setSkillsInput("");
    } catch (error) {
      setError(error.message || "Failed to create resume");
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <motion.div
      className="resume-form-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2>Create Your Resume</h2>
      {error && <p className="error-message">{error}</p>}

      <form className="resume-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            placeholder={user?.email || "Enter your email"}
            value={formData.email || user?.email || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone *</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <h3>Education</h3>
          <div className="form-group">
            <input type="text" placeholder="Degree" value={educationInput.degree} onChange={(e) => setEducationInput({...educationInput, degree: e.target.value})} />
            <input type="text" placeholder="Institution" value={educationInput.institution} onChange={(e) => setEducationInput({...educationInput, institution: e.target.value})} />
            <input type="text" placeholder="Year" value={educationInput.year} onChange={(e) => setEducationInput({...educationInput, year: e.target.value})} />
            <input type="text" placeholder="Grade" value={educationInput.grade} onChange={(e) => setEducationInput({...educationInput, grade: e.target.value})} />
            <button type="button" onClick={addEducation}>Add Education</button>
          </div>
          {formData.education.length > 0 && (
            <ul>
              {formData.education.map((edu, idx) => (
                <li key={idx}>{edu.degree} - {edu.institution} ({edu.year})</li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-section">
          <h3>Experience</h3>
          <div className="form-group">
            <input type="text" placeholder="Company" value={experienceInput.company} onChange={(e) => setExperienceInput({...experienceInput, company: e.target.value})} />
            <input type="text" placeholder="Role" value={experienceInput.role} onChange={(e) => setExperienceInput({...experienceInput, role: e.target.value})} />
            <input type="text" placeholder="Duration" value={experienceInput.duration} onChange={(e) => setExperienceInput({...experienceInput, duration: e.target.value})} />
            <textarea placeholder="Description" value={experienceInput.description} onChange={(e) => setExperienceInput({...experienceInput, description: e.target.value})} />
            <button type="button" onClick={addExperience}>Add Experience</button>
          </div>
          {formData.experience.length > 0 && (
            <ul>
              {formData.experience.map((exp, idx) => (
                <li key={idx}>{exp.role} at {exp.company} ({exp.duration})</li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-section">
          <h3>Skills</h3>
          <div className="form-group">
            <input type="text" placeholder="Enter skills (comma-separated)" value={skillsInput} onChange={handleSkillsChange} />
            <button type="button" onClick={addSkills}>Add Skills</button>
          </div>
          {formData.skills.length > 0 && (
            <ul>
              {formData.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          )}
        </div>

        <motion.button
          type="submit"
          className="btn-submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={submitted}
        >
          {submitted ? "Submitting..." : "Create Resume"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ResumeForm;
