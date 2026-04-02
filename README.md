# TanFinance: Finance Dashboard UI

> Professional frontend finance dashboard with role-based simulation, analytics, and transaction management

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Styled with TailwindCSS](https://img.shields.io/badge/Styled%20with-Tailwind-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![State Management](https://img.shields.io/badge/State-Zustand-1f2937?style=flat-square)](https://zustand-demo.pmnd.rs/)
[![Charts](https://img.shields.io/badge/Charts-Recharts-22c55e?style=flat-square)](https://recharts.org/)

## Overview

TanFinance is a frontend-only finance dashboard built for an internship assignment. It focuses on clean UI, practical dashboard features, and realistic workflows like login simulation, role-based permissions, analytics, filtering, and export.

### Problem
- Most dashboard assignments look visually good but miss practical interactions
- Interview projects need clear architecture, responsive design, and explainable decisions
- Recruiters expect complete frontend behavior even without backend APIs

## Key Features

- Summary cards for total balance, income, and expenses
- Analytics section with balance trend and spending breakdown charts
- Transactions table with search, sort, date-range filter, and category filter
- Role-based simulation
- Admin can add and edit transactions
- User has read-only access
- Mock JWT-style login and persisted session
- Dark mode toggle with persisted preference
- CSV and JSON export for transactions
- Insights panel with top spending category and monthly metrics
- Responsive layout for desktop, tablet, and mobile

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, JavaScript, Tailwind CSS |
| State | Zustand + persist middleware |
| Charts | Recharts |
| Animation/UI | Framer Motion, Lucide React |
| Data | Static mock data (frontend only) |

## Prerequisites

- Node.js 18+
- npm

## Installation and Run

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@tanfinanceinc.com | Admin@123 |
| User | user@tanfinanceinc.com | User@123 |

## Usage

1. Open the app and choose a role from landing page
2. Login with demo credentials
3. View dashboard cards, charts, and insights
4. Use filters and search in transactions
5. As Admin, add or edit transactions
6. Export transaction data as CSV or JSON

## Project Structure

```text
finance-dashboard-ui
|- public
|- src
|  |- components
|  |- data
|  |- store
|  |- utils
|  |- App.jsx
|  |- main.jsx
|- index.html
|- package.json
|- README.md
```

## Approach

- Built modular UI sections to keep features isolated and maintainable
- Kept state centralized in Zustand for predictable behavior
- Used mock authentication and mock data to simulate real product flow
- Prioritized interview-readiness: clarity, usability, and clean code structure

## Author

- Name: Tanmay Sharma
- Email: sharmatanmay875@gmail.com
