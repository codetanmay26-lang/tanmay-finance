import { formatCurrency } from '../utils/finance'

const cardConfig = [
  {
    key: 'balance',
    title: 'Total Balance',
    accent: 'from-[#172554] to-[#1d4ed8]',
  },
  {
    key: 'income',
    title: 'Income',
    accent: 'from-[#064e3b] to-[#10b981]',
  },
  {
    key: 'expenses',
    title: 'Expenses',
    accent: 'from-[#7f1d1d] to-[#f43f5e]',
  },
]

function SummaryCards({ summary }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cardConfig.map((card) => (
        <article
          key={card.key}
          className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(15,23,42,0.12)] dark:border-slate-700 dark:bg-slate-900"
        >
          <div
            className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${card.accent}`}
          />
          <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-slate-100 transition group-hover:scale-110 dark:bg-slate-800" />
          <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            {card.title}
          </p>
          <h3 className="relative mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {formatCurrency(summary[card.key])}
          </h3>
        </article>
      ))}
    </div>
  )
}

export default SummaryCards
