import request from "supertest";
import app from "../server.js";
import mongoose from "mongoose";
import Resume from "../models/Resume.js";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Resume API", () => {
  let resumeId;

  it("should create a resume", async () => {
    const res = await request(app)
      .post("/api/resumes")
      .send({
        user: mongoose.Types.ObjectId(),
        title: "My Resume",
        skills: ["React", "Node.js"],
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("My Resume");
    resumeId = res.body._id;
  });

  it("should get all resumes", async () => {
    const res = await request(app).get("/api/resumes");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should delete a resume", async () => {
    const res = await request(app).delete(`/api/resumes/${resumeId}`);
    expect(res.statusCode).toBe(200);
  });
});
