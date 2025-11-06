import request from "supertest";
import app from "../server.js";
import mongoose from "mongoose";
import Quiz from "../models/Quiz.js";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Quiz API", () => {
  let quizId;

  it("should create a quiz", async () => {
    const res = await request(app)
      .post("/api/quizzes")
      .send({
        title: "Sample Quiz",
        description: "This is a test quiz",
        difficulty: "Easy",
        questions: [{ question: "2+2?", answer: "4" }],
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Sample Quiz");
    quizId = res.body._id;
  });

  it("should get all quizzes", async () => {
    const res = await request(app).get("/api/quizzes");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should delete the quiz", async () => {
    const res = await request(app).delete(`/api/quizzes/${quizId}`);
    expect(res.statusCode).toBe(200);
  });
});
