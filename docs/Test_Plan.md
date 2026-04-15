# Test Plan: Automation Exercise Regression Suite

## 1. Introduction
This plan defines the strategy for the **Automation Exercise** regression suite. The project demonstrates proficiency in **Playwright**, **TypeScript**, and **CI/CD**, following industry-standard QA practices.

## 2. Test Objectives
* **Functional Validation:** Verify core E2E workflows (Auth, Cart, Checkout).
* **Stability:** Establish a reliable regression suite for automated execution.
* **Engineering Standards:** Demonstrate **Page Object Model (POM)**, dynamic data handling, and secure credential management.
* **Cross-Browser Reliability:** Ensure consistency across Chromium, Firefox, and WebKit.

## 3. Scope
### 3.1 In-Scope
* **Authentication:** Registration, Login, Logout, and Account Deletion.
* **Product & Cart:** Search, Filtering, Add/Remove items, and Quantity updates.
* **Checkout:** Full E2E purchase flow and Payment Gateway simulation.
* **UI/Forms:** Contact forms, Subscriptions, and File Uploads.

### 3.2 Out-of-Scope
* Performance/Load testing.
* App security checks.
* Visual checks for UI design and consistency.

## 4. Automation Strategy
* **Framework:** Playwright (TypeScript).
* **Architecture:** Page Object Model (POM) for modularity and maintenance.
* **Test Data:** Dynamic email generation (`Date.now()`) for test isolation; JSON fixtures for static data.
* **CI/CD:** Automated execution via **GitHub Actions** on `push` and `pull_request`.
* **Reporting:** Playwright HTML reports, trace files, and video recordings.

## 5. Automation Selection Criteria
The target is **100% automation (26/26 cases)** to demonstrate technical breadth, including:
* Complex UI interactions (iframes, alerts, file uploads).
* State-based scenarios (session persistence).
* High-frequency business-critical workflows.

## 6. Execution Environment
| Component | Specification |
| :--- | :--- |
| **Browsers** | Chromium, Firefox, WebKit |
| **CI/CD** | GitHub Actions (Ubuntu-latest) |
| **Local OS** | Windows / macOS |
| **Secrets** | GitHub Repository Secrets (`USER_EMAIL`, `USER_PASSWORD`) |

## 7. Defect Management
Failures will be sorted as **Script Issues** or **Application Defects**. Defects are logged in GitHub Issues including:
* Steps to reproduce.
* Playwright **Trace Logs** and **Videos**.
* Severity and priority levels.

## 8. Exit Criteria
* All 26 test cases are automated and pass consistently in CI.
* The **Requirement Traceability Matrix (RTM)** is fully mapped.
* Codebase adheres to DRY (Don't Repeat Yourself) principles and POM best practices.