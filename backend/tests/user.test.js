import request from "supertest";
import app from "../server.js";
import mongoose from "mongoose";
import User from "../models/User.js";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User API", () => {
  let token;

  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        name: "Test User",
        email: "testuser@example.com",
        password: "123456",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should login a user", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        email: "testuser@example.com",
        password: "123456",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should fetch user profile", async () => {
    const res = await request(app)
      .get("/api/users/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.email).toBe("testuser@example.com");
  });
});
