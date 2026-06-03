import { Page } from "@playwright/test";

export class SidebarComponent {
  constructor(private page: Page) {}

  // ==========================================
  // LOCATORS & ACTIONS: CATEGORIES (TC18)
  // ==========================================

  get categorySidebarTitle() {
    return this.page.getByRole("heading", { name: "Category" });
  }

  categoryHeader(name: "Women" | "Men" | "Kids") {
    return this.page
      .locator("#accordian .panel-title a")
      .filter({ hasText: new RegExp(`^\\s*${name}\\s*$`, "i") });
  }

  subCategoryLink(category: "Women" | "Men" | "Kids", subCategory: string) {
    return this.page
      .locator(`#${category}`)
      .getByRole("link", { name: subCategory });
  }

  get categoryPageTitleHeader() {
    return this.page.locator(".features_items .title");
  }

  async expandCategory(category: "Women" | "Men" | "Kids") {
    const header = this.categoryHeader(category);
    await header.click();
    await this.page.locator(`#${category}`).waitFor({ state: "visible" });
  }

  async selectSubCategory(category: "Women" | "Men" | "Kids", subCategory: string) {
    const subLink = this.subCategoryLink(category, subCategory);
    await subLink.click();
  }

  // ==========================================
  // LOCATORS & ACTIONS: BRANDS (TC19)
  // ==========================================

  get brandSidebarTitle() {
    return this.page.getByRole('heading', { name: "Brands" });
  }

  // Parameterized locator using a template literal for high readability
  brandLink(brandName: string) {
    return this.page.locator('.brands-name').getByRole('link', { name: brandName });
  }

  async selectBrand(brandName: string) {
    const link = this.brandLink(brandName);
    await link.scrollIntoViewIfNeeded(); // Best practice: ensure it's in view
    await link.click();
  }
}