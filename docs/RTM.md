# Requirement Traceability Matrix (RTM)

**Project:** Automation Exercise
**Source:** [Automation Exercise Test Cases](https://automationexercise.com/test_cases)

---

### Status:

- ⚪ **Pending**: Not yet started.
- 🟢 **Completed**: Scripted, verified, and passing in CI/CD.

---

| Module                  | TC ID | Test Case Description                        | Status       | Playwright Script Path       |
| :---------------------- | :---- | :------------------------------------------- | :----------- | :--------------------------- |
| **Auth & Account**      | TC-1  | Register User                                | 🟢 Completed | `tests/auth.spec.ts`         |
|                         | TC-2  | Login User with correct email and password   | 🟢 Completed | `tests/auth.spec.ts`         |
|                         | TC-3  | Login User with incorrect email and password | 🟢 Completed | `tests/auth.spec.ts`         |
|                         | TC-4  | Logout User                                  | 🟢 Completed | `tests/auth.spec.ts`         |
|                         | TC-5  | Register User with existing email            | 🟢 Completed | `tests/auth.spec.ts`         |
| **UI & Navigation**     | TC-6  | Contact Us Form                              | 🟢 Completed | `tests/contact.spec.ts`      |
|                         | TC-7  | Verify Test Cases page                       | 🟢 Completed | `tests/navigation.spec.ts`   |
| **Product Catalog**     | TC-8  | Verify All Products and detail page          | 🟢 Completed | `tests/product.spec.ts`      |
|                         | TC-9  | Search Product                               | 🟢 Completed | `tests/product.spec.ts`      |
| **Cart & Subscription** | TC-10 | Verify Subscription in home page             | 🟢 Completed | `tests/subscription.spec.ts` |
|                         | TC-11 | Verify Subscription in Cart page             | 🟢 Completed | `tests/subscription.spec.ts` |
|                         | TC-12 | Add Products in Cart                         | 🟢 Completed | `tests/cart.spec.ts`         |
|                         | TC-13 | Verify Product quantity in Cart              | 🟢 Completed | `tests/cart.spec.ts`         |
| **Checkout & Order**    | TC-14 | Place Order: Register while Checkout         | 🟢 Completed | `tests/checkout.spec.ts`     |
|                         | TC-15 | Place Order: Register before Checkout        | 🟢 Completed | `tests/checkout.spec.ts`     |
|                         | TC-16 | Place Order: Login before Checkout           | 🟢 Completed | `tests/checkout.spec.ts`     |
| **Cart & Sub**          | TC-17 | Remove Products From Cart                    | 🟢 Completed | `tests/cart.spec.ts`         |
| **Product Catalog**     | TC-18 | View Category Products                       | 🟢 Completed | `tests/categories.spec.ts`   |
|                         | TC-19 | View & Cart Brand Products                   | ⚪ Pending   | `tests/product.spec.ts`      |
| **Checkout & Order**    | TC-20 | Search Products / Verify Cart After Login    | ⚪ Pending   | `tests/checkout.spec.ts`     |
| **Product Catalog**     | TC-21 | Add review on product                        | ⚪ Pending   | `tests/product.spec.ts`      |
| **Cart & Sub**          | TC-22 | Add to cart from Recommended items           | ⚪ Pending   | `tests/cart.spec.ts`         |
| **Checkout & Order**    | TC-23 | Verify address details in checkout page      | ⚪ Pending   | `tests/checkout.spec.ts`     |
|                         | TC-24 | Download Invoice after purchase order        | ⚪ Pending   | `tests/checkout.spec.ts`     |
| **UI & Navigation**     | TC-25 | Verify Scroll Up using 'Arrow' button        | ⚪ Pending   | `tests/navigation.spec.ts`   |
|                         | TC-26 | Verify Scroll Up without 'Arrow' button      | ⚪ Pending   | `tests/navigation.spec.ts`   |
