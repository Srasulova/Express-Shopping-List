process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");

let items = require("../fakeDb");

let item = { name: "something", price: 150 };

beforeEach(async () => {
  items.push(item);
});

afterEach(async () => {
  items.length = 0;
});

// Get items

describe("GET /items", function () {
  test("Gets list of items", async () => {
    const response = await request(app).get("/items");
    const { items } = response.body;
    expect(response.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
});

// Get one item

describe("GET /items/:name", () => {
  test("Gets a single item", async () => {
    const response = await request(app).get(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual(item);
  });

  test("Responds with 404 error if cannot find item", async () => {
    const response = await request(app).get(`/items/somethingElse`);
    expect(response.statusCode).toBe(404);
  });
});

// Post items

describe("POST /items", () => {
  test("Create item", async () => {
    const response = await request(app).post("/items").send({
      name: "taco",
      price: 15,
    });
    expect(response.statusCode).toBe(200);
    expect(items).toHaveLength(2);
    expect(response.body.item).toHaveProperty("name");
    expect(response.body.item).toHaveProperty("price");
    expect(response.body.item.name).toEqual("taco");
    expect(response.body.item.price).toEqual(15);
  });
});

// Patch item

describe("PATCH /items/:name", () => {
  test("Update an item", async () => {
    const response = await request(app).patch(`/items/${item.name}`).send({
      name: "tacoShell",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.item.name).toEqual("tacoShell");
  });

  test("Responds with 404 error if cannot find item", async () => {
    const response = await request(app).get(`/items/somethingElse`);
    expect(response.statusCode).toBe(404);
  });
});

// Delete an item
describe("DELETE /items/:name", () => {
  test("Deletes a single item", async () => {
    const response = await request(app).delete(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Deleted" });
  });
});
