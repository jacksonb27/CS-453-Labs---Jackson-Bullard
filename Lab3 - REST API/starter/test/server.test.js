import { describe, expect, test } from "vitest";
import request from "supertest";
import { createApp } from "../src/server.js";

describe("Lab 3 starter", () => {
  test("GET /health returns status ok", async () => {
    const app = createApp();
    const response = await request(app)
      .get("/health")
      .expect(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});

// Note: I did use AI to help me create other tests to verify everything was working correctly

describe("GET /items", () => {
  test("returns all items with status 200", async () => {
    const app = createApp();
    const response = await request(app).get("/items").expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("GET /items/:id", () => {
  test("returns the item when it exists", async () => {
    const app = createApp();
    const response = await request(app).get("/items/1").expect(200);
    expect(response.body).toMatchObject({ id: 1, name: "keyboard", quantity: 10 });
  });

  test("returns 404 when item does not exist", async () => {
    const app = createApp();
    const response = await request(app).get("/items/9999").expect(404);
    expect(response.body).toHaveProperty("error");
  });
});

describe("POST /items", () => {
  test("creates a new item and returns 201", async () => {
    const app = createApp();
    const response = await request(app)
      .post("/items")
      .send({ name: "monitor", quantity: 3 })
      .expect(201);
    expect(response.body).toMatchObject({ name: "monitor", quantity: 3 });
    expect(response.body).toHaveProperty("id");
  });

  test("returns 400 when name is missing", async () => {
    const app = createApp();
    const response = await request(app)
      .post("/items")
      .send({ quantity: 3 })
      .expect(400);
    expect(response.body).toHaveProperty("error");
  });

  test("returns 400 when quantity is missing", async () => {
    const app = createApp();
    const response = await request(app)
      .post("/items")
      .send({ name: "monitor" })
      .expect(400);
    expect(response.body).toHaveProperty("error");
  });
});

describe("PUT /items/:id", () => {
  test("updates an existing item and returns 200", async () => {
    const app = createApp();
    const response = await request(app)
      .put("/items/1")
      .send({ name: "keyboard", quantity: 99 })
      .expect(200);
    expect(response.body).toMatchObject({ id: 1, name: "keyboard", quantity: 99 });
  });

  test("returns 404 when item does not exist", async () => {
    const app = createApp();
    const response = await request(app)
      .put("/items/9999")
      .send({ name: "keyboard", quantity: 99 })
      .expect(404);
    expect(response.body).toHaveProperty("error");
  });

  test("returns 400 when body is missing fields", async () => {
    const app = createApp();
    const response = await request(app)
      .put("/items/1")
      .send({ name: "keyboard" })
      .expect(400);
    expect(response.body).toHaveProperty("error");
  });
});

describe("DELETE /items/:id", () => {
  test("deletes an existing item and returns 204", async () => {
    const app = createApp();
    await request(app).delete("/items/1").expect(204);
  });

  test("returns 404 when item does not exist", async () => {
    const app = createApp();
    const response = await request(app).delete("/items/9999").expect(404);
    expect(response.body).toHaveProperty("error");
  });
});