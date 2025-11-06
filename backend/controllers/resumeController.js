import Resume from "../models/Resume.js";

// Create resume
export const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({ ...req.body, user: req.user._id });
    res.status(201).json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all resumes
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get resume by user
export const getResumeByUser = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
