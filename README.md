# Finance Dashboard UI

I built this frontend-only finance dashboard with React, Vite, JavaScript, Tailwind CSS, and mock data for an internship assignment focused on dashboard design, interactions, and clean frontend structure.

## Author

- Name: Tanmay Sharma
- Email: sharmatanmay875@gmail.com

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- Zustand for state management
- Recharts for charts
- Framer Motion for transitions

## Features

- Common landing page before login
- JWT-style mock authentication for admin and user roles
- Login and logout flow with persisted session token
- Dashboard summary cards for total balance, income, and expenses
- Time-based visualization for monthly balance trend
- Categorical visualization for spending breakdown
- Transactions section with search, sorting, date-range filtering, multi-category filtering, and empty states
- Role-based UI simulation
- User role can only inspect data
- Admin role can add and edit transactions
- Insights section with highest spending category, monthly comparison, and average expense
- Export transactions to CSV and JSON
- Local storage persistence for auth session, theme, and transactions
- Responsive layout across mobile, tablet, and desktop
- Dark mode toggle
- Lazy-loaded chart modules for improved code splitting

## Demo Credentials

- Admin
	- Email: admin@tanfinanceinc.com
	- Password: Admin@123
- User
	- Email: user@tanfinanceinc.com
	- Password: User@123

## What I Built

- A finance dashboard with summary cards, charts, transactions, insights, and filtering
- A lightweight frontend-only auth flow with role-based access simulation
- A polished landing screen that leads into the dashboard experience
- Responsive layouts, dark mode, export actions, and persisted state

## Project Structure

- src/data: mock transactions
- src/store: Zustand store and actions
- src/utils: finance calculation and formatting helpers
- src/components: dashboard UI sections and modal forms

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview production build:

```bash
npm run preview
```

## Notes

- The app uses static/mock data with frontend state only.
- There is no backend dependency.
