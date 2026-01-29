Demoblaze Playwright Automation

Overview

This repository contains a focused UI automation framework for the Demoblaze demo e-commerce site
(https://www.demoblaze.com), built using Playwright with TypeScript.

The framework demonstrates test-architect-level automation design: clean structure, stable execution, and clear diagnostics rather than large test volume.

Technology Stack

	•	Playwright
	•	TypeScript
	•	Page Object Model (POM)
	•	GitHub Actions (CI)
	•	Playwright HTML Report


Test Coverage (High-Value Only)

The automated suite validates business-critical flows:
	•	Homepage smoke & navigation
	•	Product detail page rendering
  •	Add to cart and dialog validation
	•	Add to cart and cart total validation
	•	End-to-end checkout and order confirmation

Architecture Highlights

	•	Page Object Model separates test intent from UI implementation
	•	Custom fixtures provide reusable page objects and shared utilities
	•	Lean E2E design avoids brittle and low-value tests


Cross-Browser & CI Execution

Tests run across:
	•	Chromium
	•	Firefox
	•	WebKit (Safari)

Execution is optimised for GitHub Actions with controlled parallelism and artifact reporting.

Running Tests Locally:
npm install
npx playwright install
npx playwright test

View the report:
npx playwright show-report
