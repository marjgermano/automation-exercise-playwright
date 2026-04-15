# Playwright Automation Framework: Automation Exercise

> **Project Purpose:** This project is designed to showcase practical skills in Playwright, TypeScript, and continuous integration through GitHub Actions, while demonstrating real‑world QA engineering practices—transitioning from manual test analysis to structured automation.

---

## Project Overview
This repository contains a robust end-to-end (E2E) automation framework designed for the [Automation Exercise](https://automationexercise.com/) platform. It serves as a comprehensive demonstration of the Software Testing Life Cycle (STLC), moving from requirement analysis to automated execution and reporting.

---

## QA Documentation
I developed a full suite of test deliverables to ensure structured testing:

* **[Test Analysis](./docs/Test_Analysis.md):** Detailed breakdown of requirements and logical grouping of test cases.
* **[Requirement Traceability Matrix (RTM)](./docs/RTM.md):** A mapping document ensuring 100% coverage of the 26 targeted test cases.
* **[Test Plan](./docs/Test_Plan.md):** The strategic roadmap defining tools, scope, and exit criteria.

---

## Tech Stack & Architecture
* **Framework:** Playwright
* **Language:** TypeScript
* **Design Pattern:** **Page Object Model (POM)** for clean, maintainable, and reusable code.
* **CI/CD:** **GitHub Actions** for automated regression testing on every push.
* **Security:** Use of **GitHub Repository Secrets** to manage sensitive credentials (`USER_EMAIL`, `USER_PASSWORD`).
* **Reporting:** Playwright HTML reports featuring trace logs, screenshots, and video recordings.