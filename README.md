# FinFlow Dashboard

FinFlow Dashboard is a modern personal finance tracking web app built with React, TypeScript, and Vite. It helps users monitor balances, income, expenses, savings, spending patterns, and transaction history through a clean dashboard interface.

## Live Demo

https://finance-three-inky.vercel.app/

---

## Overview

The goal of this project is to provide a simple and interactive finance dashboard where users can:

- view a summary of their financial status
- track income, expenses, and savings
- analyze spending trends visually
- manage transaction records
- filter and search transactions quickly
- get useful financial insights from dashboard data

The app focuses on making financial activity easier to understand through charts, summary cards, and an organized transaction table.

---

## Features

### 1. Dashboard Summary Cards
At the top of the dashboard, users can quickly see:

- Total Balance
- Income
- Expenses
- Net Savings

These cards give a quick snapshot of the current financial state.

### 2. Monthly Financial Trend Chart
The dashboard includes a trend chart that compares:

- income over time
- expenses over time

This helps users understand monthly financial patterns and compare earning versus spending.

### 3. Spending by Category
A donut chart shows how expenses are distributed across categories such as:

- Rent
- Shopping
- Food
- Transport
- Utilities
- Healthcare
- Entertainment

This makes it easy to identify where most money is being spent.

### 4. Financial Insights Section
The insights section highlights key observations from the data, such as:

- top spending category
- biggest expense
- savings rate
- spending change
- average expense

This gives users quick, meaningful summaries instead of only raw numbers.

### 5. Transactions Management
The transactions table allows users to:

- view all transactions
- search transactions
- filter by type
- filter by category
- sort transactions
- filter by date range
- add new transactions
- edit transactions
- delete transactions

This makes the app useful not just as a dashboard, but also as a day-to-day transaction manager.

### 6. Responsive Modern UI
The app has a clean and modern interface with:

- card-based layout
- charts for visualization
- structured tables
- action buttons
- top navigation with search and export options

---

## Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **shadcn/ui**
- **PostCSS**
- **Vitest**
- **Playwright**

---

## Project Structure

```bash
finflow-dashboard/
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── test/
│   ├── types/
│   ├── utils/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── playwright-fixture.ts
├── playwright.config.ts
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── vitest.config.ts
