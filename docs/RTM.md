# Requirement Traceability Matrix (RTM)

**Project:** Automation Exercise  
**Automation Framework:** Playwright (TypeScript)  
**Execution Strategy:** Hybrid Testing Architecture (Separated UI/API Pipelines)

### Status Legend

- 🟢 **Completed:** Scripted, locally verified, and passing cleanly in CI/CD.
- ⚪ \*:\*\* Framework structure ready, waiting for execution scripting.

---

## Frontend UI Test Suite

| Module               | Target ID | Requirement / Test Case Description              | Status | Test Script Path             |
| :------------------- | :-------- | :----------------------------------------------- | :----: | :--------------------------- |
| **Auth & Account**   | TC-1      | UI: Register User                                |   🟢   | `tests/auth.spec.ts`         |
|                      | TC-2      | UI: Login User with correct email and password   |   🟢   | `tests/auth.spec.ts`         |
|                      | TC-3      | UI: Login User with incorrect email and password |   🟢   | `tests/auth.spec.ts`         |
|                      | TC-4      | UI: Logout User                                  |   🟢   | `tests/auth.spec.ts`         |
|                      | TC-5      | UI: Register User with existing email            |   🟢   | `tests/auth.spec.ts`         |
| **UI & Navigation**  | TC-6      | UI: Contact Us Form                              |   🟢   | `tests/contact.spec.ts`      |
|                      | TC-7      | UI: Verify Test Cases page                       |   🟢   | `tests/navigation.spec.ts`   |
| **Product Catalog**  | TC-8      | UI: Verify All Products and detail page          |   🟢   | `tests/product.spec.ts`      |
|                      | TC-9      | UI: Search Product                               |   🟢   | `tests/product.spec.ts`      |
| **Cart & Sub**       | TC-10     | UI: Verify Subscription in home page             |   🟢   | `tests/subscription.spec.ts` |
|                      | TC-11     | UI: Verify Subscription in Cart page             |   🟢   | `tests/subscription.spec.ts` |
|                      | TC-12     | UI: Add Products in Cart                         |   🟢   | `tests/cart.spec.ts`         |
|                      | TC-13     | UI: Verify Product quantity in Cart              |   🟢   | `tests/cart.spec.ts`         |
| **Checkout & Order** | TC-14     | UI: Place Order: Register while Checkout         |   🟢   | `tests/checkout.spec.ts`     |
|                      | TC-15     | UI: Place Order: Register before Checkout        |   🟢   | `tests/checkout.spec.ts`     |
|                      | TC-16     | UI: Place Order: Login before Checkout           |   🟢   | `tests/checkout.spec.ts`     |
| **Cart & Sub**       | TC-17     | UI: Remove Products From Cart                    |   🟢   | `tests/cart.spec.ts`         |
| **Product Catalog**  | TC-18     | UI: View Category Products                       |   🟢   | `tests/categories.spec.ts`   |
|                      | TC-19     | UI: View & Cart Brand Products                   |   🟢   | `tests/product.spec.ts`      |
| **Checkout & Order** | TC-20     | UI: Search Products / Verify Cart After Login    |   🟢   | `tests/cart.spec.ts`         |
| **Product Catalog**  | TC-21     | UI: Add review on product                        |   🟢   | `tests/product.spec.ts`      |
| **Cart & Sub**       | TC-22     | UI: Add to cart from Recommended items           |   🟢   | `tests/cart.spec.ts`         |
| **Checkout & Order** | TC-23     | UI: Verify address details in checkout page      |   🟢   | `tests/checkout.spec.ts`     |
|                      | TC-24     | UI: Download Invoice after purchase order        |   ⚪   | `tests/checkout.spec.ts`     |
| **UI & Navigation**  | TC-25     | UI: Verify Scroll Up using 'Arrow' button        |   🟢   | `tests/navigation.spec.ts`   |
|                      | TC-26     | UI: Verify Scroll Up without 'Arrow' button      |   🟢   | `tests/navigation.spec.ts`   |

---

## Backend API Test Suite

| Domain Module       | Target ID | Requirement / Endpoint Verification                  | Status | Test Script Path                |
| :------------------ | :-------- | :--------------------------------------------------- | :----: | :------------------------------ |
| **Catalog**         | API-1     | GET: Retrieve all products list                      |   ⚪   | `tests/api/products.spec.ts`    |
|                     | API-2     | POST: Verify server rejects POST to products list    |   ⚪   | `tests/api/products.spec.ts`    |
|                     | API-3     | POST: Search product with query string parameters    |   ⚪   | `tests/api/products.spec.ts`    |
|                     | API-4     | POST: Verify search response with missing parameters |   ⚪   | `tests/api/products.spec.ts`    |
| **Vendor**          | API-11    | GET: Retrieve all brands list                        |   ⚪   | `tests/api/brands.spec.ts`      |
|                     | API-12    | PUT: Verify server rejects PUT to brands list        |   ⚪   | `tests/api/brands.spec.ts`      |
| **User Account**    | API-5     | POST: Verify login validation with correct records   |   ⚪   | `tests/api/userAccount.spec.ts` |
|                     | API-6     | POST: Verify login validation with missing fields    |   ⚪   | `tests/api/userAccount.spec.ts` |
|                     | API-13    | POST: Verify login validation with bad credentials   |   ⚪   | `tests/api/userAccount.spec.ts` |
|                     | API-7     | GET: Retrieve target user account details by email   |   ⚪   | `tests/api/userAccount.spec.ts` |
|                     | API-8     | POST: Register a new user account profile            |   ⚪   | `tests/api/userAccount.spec.ts` |
|                     | API-10    | PUT: Update user account profile parameters          |   ⚪   | `tests/api/userAccount.spec.ts` |
|                     | API-9     | DELETE: Purge user account record from database      |   ⚪   | `tests/api/userAccount.spec.ts` |
|                     | API-14    | GET: Verify server rejects GET call to delete route  |   ⚪   | `tests/api/userAccount.spec.ts` |
| **Cart Operations** | API-15    | POST: Add products to cart session state             |   ⚪   | `tests/api/cart.spec.ts`        |
|                     | API-16    | GET: Retrieve elements saved inside session cart     |   ⚪   | `tests/api/cart.spec.ts`        |
|                     | API-17    | DELETE: Remove explicit items from shopping cart     |   ⚪   | `tests/api/cart.spec.ts`        |
|                     | API-18    | PUT: Verify server rejects modified item updates     |   ⚪   | `tests/api/cart.spec.ts`        |
