import { formatCurrency } from '../utils/finance'

function InsightsSection({ insights }) {
  const comparisonLabel =
    insights.monthlyComparison >= 0 ? 'Improved from last month' : 'Lower than last month'

  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Insights
        </h2>
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
          Smart Highlights
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
            Highest Spending Category
          </p>
          <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
            {insights.highestCategory}
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
            Monthly Comparison
          </p>
          <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
            {formatCurrency(Math.abs(insights.monthlyComparison))}
          </p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{comparisonLabel}</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
            Average Expense Transaction
          </p>
          <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
            {formatCurrency(insights.averageExpense)}
          </p>
        </article>
      </div>
    </section>
  )
}

export default InsightsSection
