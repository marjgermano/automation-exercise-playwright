import { Page } from "@playwright/test";

export class SidebarComponent {
  constructor(private page: Page) {}

  // Locators
  get categorySidebarTitle() {
    return this.page.getByRole("heading", { name: "Category" });
  }

  categoryHeader(name: "Women" | "Men" | "Kids") {
    // 🟢 FIX: Use a strict RegExp anchor filter to isolate the precise text value.
    // This prevents 'Men' from matching 'Women' due to substring overlapping.
    return this.page
      .locator("#accordian .panel-title a")
      .filter({ hasText: new RegExp(`^\\s*${name}\\s*$`, "i") });
  }

  // Locates sub-categories inside an expanded menu panel
  subCategoryLink(category: "Women" | "Men" | "Kids", subCategory: string) {
    // Keeps the exact case match (#Women / #Men) to align with the site's DOM attributes
    return this.page
      .locator(`#${category}`)
      .getByRole("link", { name: subCategory });
  }

  get categoryPageTitleHeader() {
    return this.page.locator(".features_items .title");
  }

  // Actions
  async expandCategory(category: "Women" | "Men" | "Kids") {
    const header = this.categoryHeader(category);
    await header.click();

    // Explicit state check ensuring the accordion slides open completely before continuing
    await this.page.locator(`#${category}`).waitFor({ state: "visible" });
  }

  async selectSubCategory(
    category: "Women" | "Men" | "Kids",
    subCategory: string,
  ) {
    const subLink = this.subCategoryLink(category, subCategory);
    await subLink.click();
  }
}
