![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![Playwright](https://img.shields.io/badge/Playwright-API%20Testing-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ESModules-yellow)
![QA](https://img.shields.io/badge/QA-Automation-critical)
![AI](https://img.shields.io/badge/AI-Assisted-informational)

# 🤖 AI-Assisted QA Automation (Public API)

A **JavaScript QA automation project** using **Playwright** to test a **public API**, generate **HTML reports**, and optionally use **AI** to create **bug reports** and **new test ideas** from real failures.

Built as a **portfolio project** to demonstrate practical QA, automation, and analytical skills.

---

## 🚀 Overview

The project runs automated API tests against a public API (JSONPlaceholder by default), covering:
- API contract validation
- Negative and edge-case scenarios
- Basic performance checks (response time)

When enabled, **AI analyzes test failures** and generates:
- Structured **bug reports**
- Suggestions for **additional test cases**

---

## 🧰 Tech Stack

- JavaScript (Node.js 18+)
- Playwright Test (API testing + HTML report)
- dotenv (environment variables)
- OpenAI-compatible LLM (optional)

---

## ▶️ How to Run

```bash
npm install
cp .env.example .env
npm test
