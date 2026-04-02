import { useMemo } from 'react'
import { formatCurrency, formatDate } from '../utils/finance'

function TransactionsSection({
  transactions,
  allCategories,
  filters,
  onFilterChange,
  onReset,
  canEdit,
  onEdit,
  onExportCsv,
  onExportJson,
}) {
  const countLabel = useMemo(() => {
    const total = transactions.length
    return `${total} ${total === 1 ? 'transaction' : 'transactions'}`
  }, [transactions])

  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Transactions</h2>
        <div className="flex items-center gap-2">
          <p className="text-sm text-slate-500 dark:text-slate-400">{countLabel}</p>
          <button
            type="button"
            onClick={onExportCsv}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Export CSV
          </button>
          <button
            type="button"
            onClick={onExportJson}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Export JSON
          </button>
        </div>
      </div>

      <div className="mb-3 grid gap-3 md:grid-cols-5">
        <input
          value={filters.search}
          onChange={(event) => onFilterChange('search', event.target.value)}
          placeholder="Search title, category, type"
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-sky-500 transition focus:ring-2 md:col-span-2 dark:border-slate-600 dark:bg-slate-800"
        />
        <select
          value={filters.typeFilter}
          onChange={(event) => onFilterChange('typeFilter', event.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-sky-500 transition focus:ring-2 dark:border-slate-600 dark:bg-slate-800"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={filters.sortBy}
          onChange={(event) => onFilterChange('sortBy', event.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-sky-500 transition focus:ring-2 dark:border-slate-600 dark:bg-slate-800"
        >
          <option value="dateDesc">Newest First</option>
          <option value="dateAsc">Oldest First</option>
          <option value="amountDesc">Highest Amount</option>
          <option value="amountAsc">Lowest Amount</option>
        </select>
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(event) => onFilterChange('dateFrom', event.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-sky-500 transition focus:ring-2 dark:border-slate-600 dark:bg-slate-800"
        />
        <input
          type="date"
          value={filters.dateTo}
          onChange={(event) => onFilterChange('dateTo', event.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-sky-500 transition focus:ring-2 dark:border-slate-600 dark:bg-slate-800"
        />
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onFilterChange('clearCategories')}
          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] transition ${
            filters.selectedCategories.length === 0
              ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
              : 'border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          All
        </button>
        {allCategories.map((category) => {
          const active = filters.selectedCategories.includes(category)
          return (
            <button
              key={category}
              type="button"
              onClick={() => onFilterChange('toggleCategory', category)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] transition ${
                active
                  ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
                  : 'border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>

      <div className="mb-5">
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Reset Filters
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="hidden grid-cols-6 gap-3 bg-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 md:grid dark:bg-slate-800 dark:text-slate-300">
          <span>Date</span>
          <span className="md:col-span-2">Title</span>
          <span>Category</span>
          <span>Type</span>
          <span className="text-right">Amount</span>
        </div>

        {transactions.length ? (
          <ul>
            {transactions.map((item) => (
              <li
                key={item.id}
                className="border-t border-slate-200 bg-white px-4 py-3 first:border-t-0 dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="grid gap-2 md:grid-cols-6 md:items-center md:gap-3">
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {formatDate(item.date)}
                  </span>
                  <span className="text-sm font-medium text-slate-900 md:col-span-2 dark:text-slate-100">
                    {item.title}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-300">{item.category}</span>
                  <span
                    className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${
                      item.type === 'income'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300'
                    }`}
                  >
                    {item.type}
                  </span>
                  <div className="flex items-center justify-between md:justify-end">
                    <span
                      className={`text-sm font-semibold ${
                        item.type === 'income'
                          ? 'text-emerald-700 dark:text-emerald-300'
                          : 'text-rose-700 dark:text-rose-300'
                      }`}
                    >
                      {item.type === 'income' ? '+' : '-'}
                      {formatCurrency(item.amount)}
                    </span>
                    {canEdit ? (
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="ml-3 rounded-md border border-slate-300 px-2.5 py-1 text-xs text-slate-700 transition hover:bg-slate-100 md:ml-4 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Edit
                      </button>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex min-h-44 items-center justify-center bg-slate-50 px-4 text-center text-slate-500 dark:bg-slate-800/50 dark:text-slate-300">
            No transactions match your current filters.
          </div>
        )}
      </div>
    </section>
  )
}

export default TransactionsSection
