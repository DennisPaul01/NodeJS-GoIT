const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../app");
const User = require("../services/schemas/UserSchema");

require("dotenv").config();

describe("Teste pentru rutele aplicatiei", () => {
  beforeAll(async () => {
    const URL_DB = process.env.DB_URL;
    await mongoose.connect(URL_DB);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await User.deleteOne({ email: "tesetjest@yahoo.com" });
  });

  it("Ar trebui sa raspunda la ruta /api", async () => {
    const response = await request(app).get("/api");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "API is running" });
  });

  it("Ar trebui sa raspunda la ruta /api/account", async () => {
    const response = await request(app).get("/api/account");
    expect(response.status).toBe(200);
  });

  it("Ar trebui sa se creeze un utilizator la ruta /api/account/register", async () => {
    const response = await request(app).post("/api/account/register").send({
      email: "tesetjest@yahoo.com",
      password: "testJest123.",
      name: "Denis Paul Jest",
    });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.code).toBe(201);
  });
});
