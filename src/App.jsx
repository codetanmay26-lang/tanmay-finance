import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AreaChart,
  ArrowRight,
  BarChart3,
  Crown,
  ChartNoAxesCombined,
  FileJson,
  FileSpreadsheet,
  LayoutDashboard,
  LogOut,
  Moon,
  Plus,
  Sparkles,
  ShieldCheck,
  Sun,
  Wallet,
  UserRound,
} from 'lucide-react'
import SummaryCards from './components/SummaryCards'
import InsightsSection from './components/InsightsSection'
import TransactionsSection from './components/TransactionsSection'
import TransactionFormModal from './components/TransactionFormModal'
import { useFinanceStore } from './store/useFinanceStore'
import {
  applyFilters,
  downloadFile,
  getCategoryTotals,
  getInsights,
  getMonthlyTrend,
  getSummary,
  toCsv,
} from './utils/finance'

const ChartsSection = lazy(() => import('./components/ChartsSection'))

const setMap = {
  search: 'setSearch',
  typeFilter: 'setTypeFilter',
  toggleCategory: 'toggleCategory',
  clearCategories: 'clearCategories',
  dateFrom: 'setDateFrom',
  dateTo: 'setDateTo',
  sortBy: 'setSortBy',
}

function App() {
  const {
    authToken,
    currentUser,
    darkMode,
    transactions,
    search,
    typeFilter,
    selectedCategories,
    dateFrom,
    dateTo,
    sortBy,
    login,
    logout,
    hydrateAuth,
    setDarkMode,
    setSearch,
    setTypeFilter,
    toggleCategory,
    clearCategories,
    setDateFrom,
    setDateTo,
    setSortBy,
    resetFilters,
    addTransaction,
    updateTransaction,
  } = useFinanceStore()

  const [modalState, setModalState] = useState({ open: false, mode: 'add' })
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false })
  const isAuthenticated = Boolean(authToken && currentUser)

  useEffect(() => {
    hydrateAuth()
  }, [hydrateAuth])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    const handleMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY, visible: true })
    }

    const handleLeave = () => {
      setCursor((prev) => ({ ...prev, visible: false }))
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  const filters = {
    search,
    typeFilter,
    selectedCategories,
    dateFrom,
    dateTo,
    sortBy,
  }

  const filteredTransactions = useMemo(
    () =>
      applyFilters({
        transactions,
        search,
        typeFilter,
        selectedCategories,
        dateFrom,
        dateTo,
        sortBy,
      }),
    [transactions, search, typeFilter, selectedCategories, dateFrom, dateTo, sortBy],
  )

  const categoryOptions = useMemo(
    () => [...new Set(transactions.map((item) => item.category))].sort(),
    [transactions],
  )

  const summary = useMemo(() => getSummary(transactions), [transactions])
  const trendData = useMemo(() => getMonthlyTrend(filteredTransactions), [filteredTransactions])
  const categoryData = useMemo(() => getCategoryTotals(filteredTransactions), [filteredTransactions])
  const insights = useMemo(() => getInsights(filteredTransactions), [filteredTransactions])
  const canEdit = currentUser?.role === 'admin'
  const cursorOverlay = cursor.visible ? (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="pointer-events-none fixed z-50 hidden h-10 w-10 items-center justify-center rounded-full border border-emerald-300 bg-emerald-100/90 text-sm font-bold text-emerald-700 shadow-lg md:flex dark:border-emerald-400/60 dark:bg-emerald-400/20 dark:text-emerald-300"
      style={{ left: cursor.x + 12, top: cursor.y + 10 }}
    >
      ₹
    </motion.div>
  ) : null

  const scrollToSection = (id) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleFilterChange = (key, value) => {
    const action = setMap[key]
    if (action === 'setSearch') {
      setSearch(value)
    }
    if (action === 'setTypeFilter') {
      setTypeFilter(value)
    }
    if (action === 'setSortBy') {
      setSortBy(value)
    }
    if (action === 'toggleCategory') {
      toggleCategory(value)
    }
    if (action === 'clearCategories') {
      clearCategories()
    }
    if (action === 'setDateFrom') {
      setDateFrom(value)
    }
    if (action === 'setDateTo') {
      setDateTo(value)
    }
  }

  const openAddModal = () => {
    setEditingTransaction(null)
    setModalState({ open: true, mode: 'add' })
  }

  const openEditModal = (transaction) => {
    setEditingTransaction(transaction)
    setModalState({ open: true, mode: 'edit' })
  }

  const closeModal = () => {
    setModalState({ open: false, mode: 'add' })
    setEditingTransaction(null)
  }

  const handleSubmit = (payload) => {
    if (modalState.mode === 'edit' && editingTransaction) {
      updateTransaction(editingTransaction.id, payload)
      return
    }
    addTransaction(payload)
  }

  const handleExportCsv = () => {
    const csv = toCsv(filteredTransactions)
    downloadFile(csv, `transactions-${Date.now()}.csv`, 'text/csv;charset=utf-8;')
  }

  const handleExportJson = () => {
    const json = JSON.stringify(filteredTransactions, null, 2)
    downloadFile(json, `transactions-${Date.now()}.json`, 'application/json')
  }

  const handleQuickLogin = (email, password) => {
    const result = login({ email, password })
    return result
  }

  const handleLogout = () => {
    logout()
  }

  if (!isAuthenticated) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-[radial-gradient(circle_at_6%_10%,#dbeafe,transparent_34%),radial-gradient(circle_at_96%_8%,#fde68a,transparent_30%),radial-gradient(circle_at_60%_0%,#ddd6fe,transparent_30%),#eef2ff] px-4 py-6 text-slate-900 dark:bg-[radial-gradient(circle_at_6%_10%,#1e1b4b,transparent_34%),radial-gradient(circle_at_96%_8%,#78350f,transparent_30%),radial-gradient(circle_at_60%_0%,#0f172a,transparent_30%),#020617] dark:text-slate-100">
          {cursorOverlay}

          <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                Tanmay Sharma
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Professional Finance Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                {darkMode ? 'Light' : 'Dark'}
              </button>
            </div>
          </div>

          <main className="mx-auto mt-8 w-full max-w-6xl">
            <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-[0_20px_45px_rgba(15,23,42,0.1)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
              <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="p-8 sm:p-12">
                  <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                      Finance Dashboard
                    </p>
                    <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
                      Track finances with a clear dashboard flow
                    </h2>
                    <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-300">
                      Jump straight into the dashboard as a demo admin or user. The flow stays
                      simple, the design stays clean, and the rupee cursor stays visible everywhere.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleQuickLogin('admin@tanfinanceinc.com', 'Admin@123')}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-slate-700 dark:bg-emerald-500 dark:text-slate-900 dark:hover:bg-emerald-400"
                      >
                        Continue as Admin
                        <ArrowRight size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickLogin('user@tanfinanceinc.com', 'User@123')}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                      >
                        Continue as User
                      </button>
                    </div>

                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="border-t border-slate-200 bg-gradient-to-br from-slate-50 via-white to-sky-50 p-6 dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 lg:border-l lg:border-t-0 lg:p-8"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                      Fintech Snapshot
                    </p>
                    <Sparkles size={16} className="text-slate-500 dark:text-slate-300" />
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Cash Flow</span>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">+12%</span>
                      </div>
                      <svg viewBox="0 0 260 90" className="h-20 w-full">
                        <defs>
                          <linearGradient id="flowLine" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M10 72C38 66 42 32 70 36C96 40 100 65 124 56C149 47 155 20 182 24C209 28 220 54 250 40"
                          stroke="url(#flowLine)"
                          strokeWidth="4"
                          fill="none"
                        />
                      </svg>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Active Users</span>
                        <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">1.2k</span>
                      </div>
                      <div className="flex items-end gap-2 pt-2">
                        <div className="h-10 w-5 rounded-t-lg bg-sky-300 dark:bg-sky-500" />
                        <div className="h-14 w-5 rounded-t-lg bg-indigo-300 dark:bg-indigo-500" />
                        <div className="h-18 w-5 rounded-t-lg bg-emerald-300 dark:bg-emerald-500" />
                        <div className="h-12 w-5 rounded-t-lg bg-amber-300 dark:bg-amber-500" />
                        <div className="h-20 w-5 rounded-t-lg bg-slate-900 dark:bg-slate-100" />
                      </div>
                    </div>

                    <div className="sm:col-span-2 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                      <svg viewBox="0 0 520 170" className="h-36 w-full">
                        <defs>
                          <linearGradient id="heroGlow" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="50%" stopColor="#c084fc" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                        </defs>
                        <rect x="12" y="20" width="496" height="130" rx="24" fill="url(#heroGlow)" opacity="0.12" />
                        <circle cx="96" cy="86" r="28" fill="#0f172a" opacity="0.12" />
                        <circle cx="168" cy="74" r="14" fill="#0ea5e9" opacity="0.8">
                          <animate attributeName="cy" values="74;60;74" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="238" cy="96" r="18" fill="#10b981" opacity="0.85">
                          <animate attributeName="cy" values="96;82;96" dur="2.6s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="330" cy="66" r="12" fill="#f59e0b" opacity="0.75">
                          <animate attributeName="cy" values="66;54;66" dur="2.8s" repeatCount="indefinite" />
                        </circle>
                        <path
                          d="M86 120C132 62 195 42 248 80C286 108 325 116 382 74C419 47 455 50 500 34"
                          stroke="#0f172a"
                          strokeOpacity="0.2"
                          strokeWidth="3"
                          fill="none"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#f5f7fb] text-slate-900 transition-colors dark:bg-[#070d1c] dark:text-slate-100">
        {cursorOverlay}
        <div className="mx-auto flex w-full max-w-[1400px] gap-6 px-4 py-6 lg:px-6">
          <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-64 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] lg:flex lg:flex-col dark:border-slate-700 dark:bg-slate-900">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Tanmay Finance
              </p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight">Control Center</h1>
            </div>
            <nav className="mt-8 space-y-2">
              <button
                type="button"
                onClick={() => scrollToSection('overview-section')}
                className="flex w-full items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-left text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
              >
                <LayoutDashboard size={16} />
                Overview
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('analytics-section')}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <ChartNoAxesCombined size={16} />
                Analytics
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('transactions-section')}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <AreaChart size={16} />
                Transactions
              </button>
            </nav>
            <div className="mt-auto rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/80">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Active Role</p>
              <p className="mt-1 text-lg font-semibold capitalize">{currentUser.role}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{currentUser.name}</p>
            </div>
          </aside>

          <main className="w-full space-y-5">
            <motion.header
              id="overview-section"
              initial={{ y: -14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    Dashboard Overview
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                    Financial Activity
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDarkMode(!darkMode)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
                  >
                    {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                    {darkMode ? 'Light' : 'Dark'}
                  </button>

                  <button
                    type="button"
                    onClick={handleExportCsv}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
                  >
                    <FileSpreadsheet size={16} />
                    CSV
                  </button>

                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
                  >
                    <FileJson size={16} />
                    JSON
                  </button>

                  {canEdit ? (
                    <button
                      type="button"
                      onClick={openAddModal}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-emerald-500 dark:text-slate-900 dark:hover:bg-emerald-400"
                    >
                      <Plus size={16} />
                      Add Transaction
                    </button>
                  ) : null}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            </motion.header>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }}>
              <SummaryCards summary={summary} />
            </motion.div>

            <motion.div
              id="analytics-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.14 }}
            >
              <Suspense
                fallback={<div className="h-96 animate-pulse rounded-3xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900" />}
              >
                <ChartsSection trendData={trendData} categoryData={categoryData} />
              </Suspense>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}>
              <InsightsSection insights={insights} />
            </motion.div>

            <motion.div
              id="transactions-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.22 }}
            >
              <TransactionsSection
                transactions={filteredTransactions}
                allCategories={categoryOptions}
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={resetFilters}
                canEdit={canEdit}
                onEdit={openEditModal}
                onExportCsv={handleExportCsv}
                onExportJson={handleExportJson}
              />
            </motion.div>
          </main>
        </div>

        <AnimatePresence>
          {modalState.open ? (
            <TransactionFormModal
              open={modalState.open}
              mode={modalState.mode}
              categories={categoryOptions}
              initialValue={editingTransaction}
              onClose={closeModal}
              onSubmit={handleSubmit}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
