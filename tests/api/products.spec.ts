import { test, expect } from "@playwright/test";

test.describe("Catalog", () => {
  test("API-1: Successfully retrieve all products from database catalog", async ({
    request,
  }) => {
    // Send HTTP GET request to the target endpoint
    const response = await request.get("/api/productsList");

    // Verify the HTTP network response status code is 200 OK
    expect(response.status()).toBe(200);

    // Parse the raw binary network stream into an interactive JSON object
    const responseBody = await response.json();

    // Check the platform's custom internal response code
    expect(responseBody.responseCode).toBe(200);

    // Verify that 'products' exists, is an array, and contains data
    expect(responseBody.products).toBeDefined();
    expect(Array.isArray(responseBody.products)).toBeTruthy();
    expect(responseBody.products.length).toBeGreaterThan(0);

    // Inspect the first product to verify properties
    const firstProduct = responseBody.products[0];

    // Check that vital data properties exist on the object
    expect(firstProduct).toHaveProperty("id");
    expect(firstProduct).toHaveProperty("name");
    expect(firstProduct).toHaveProperty("price");
    expect(firstProduct).toHaveProperty("brand");
    expect(firstProduct).toHaveProperty("category");

    // Verify data types to ensure numbers aren't returning as text strings
    expect(typeof firstProduct.id).toBe("number");
    expect(typeof firstProduct.name).toBe("string");
    expect(typeof firstProduct.price).toBe("string"); // Price is formatted as a string (e.g., "Rs. 400")
    expect(typeof firstProduct.brand).toBe("string");
    expect(typeof firstProduct.category).toBe("object"); // Category is a nested child object
  });
});
