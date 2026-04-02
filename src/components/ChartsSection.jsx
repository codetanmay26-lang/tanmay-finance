import { lazy, Suspense } from 'react'

const BalanceTrendChart = lazy(() => import('./charts/BalanceTrendChart'))
const SpendingBreakdownChart = lazy(() => import('./charts/SpendingBreakdownChart'))

function ChartsSection({ trendData, categoryData }) {
  return (
    <section className="grid gap-5 xl:grid-cols-5">
      <article className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm xl:col-span-3 dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Balance Trend
          </h2>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            Monthly View
          </p>
        </div>
        {trendData.length ? (
          <Suspense
            fallback={<div className="h-72 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />}
          >
            <BalanceTrendChart data={trendData} />
          </Suspense>
        ) : (
          <div className="flex h-72 items-center justify-center rounded-xl bg-slate-50 text-slate-500 dark:bg-slate-800/50 dark:text-slate-300">
            No trend data available
          </div>
        )}
      </article>

      <article className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm xl:col-span-2 dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Spending Breakdown
          </h2>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            By Category
          </p>
        </div>
        {categoryData.length ? (
          <Suspense
            fallback={<div className="h-72 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />}
          >
            <SpendingBreakdownChart data={categoryData} />
          </Suspense>
        ) : (
          <div className="flex h-72 items-center justify-center rounded-xl bg-slate-50 text-slate-500 dark:bg-slate-800/50 dark:text-slate-300">
            No expense data available
          </div>
        )}
      </article>
    </section>
  )
}

export default ChartsSection
