import { useEffect, useMemo, useState } from 'react'

const defaultForm = {
  date: '',
  amount: '',
  category: '',
  type: 'expense',
  title: '',
}

function TransactionFormModal({
  open,
  mode,
  categories,
  initialValue,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(defaultForm)

  useEffect(() => {
    if (!open) {
      return
    }

    if (initialValue) {
      setForm({
        date: initialValue.date,
        amount: String(initialValue.amount),
        category: initialValue.category,
        type: initialValue.type,
        title: initialValue.title,
      })
      return
    }

    setForm({
      ...defaultForm,
      date: new Date().toISOString().slice(0, 10),
    })
  }, [open, initialValue])

  const title = useMemo(() => (mode === 'edit' ? 'Edit Transaction' : 'Add Transaction'), [mode])

  if (!open) {
    return null
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const payload = {
      date: form.date,
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
      title: form.title,
    }

    onSubmit(payload)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          <button
            type="button"
            className="rounded-md border border-slate-300 px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-1">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Title</span>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-emerald-500 transition focus:ring-2 dark:border-slate-600 dark:bg-slate-800"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Amount</span>
              <input
                name="amount"
                type="number"
                min="1"
                value={form.amount}
                onChange={handleChange}
                required
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-emerald-500 transition focus:ring-2 dark:border-slate-600 dark:bg-slate-800"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Date</span>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-emerald-500 transition focus:ring-2 dark:border-slate-600 dark:bg-slate-800"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Category</span>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                list="categories"
                required
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-emerald-500 transition focus:ring-2 dark:border-slate-600 dark:bg-slate-800"
              />
              <datalist id="categories">
                {categories.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Type</span>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-emerald-500 transition focus:ring-2 dark:border-slate-600 dark:bg-slate-800"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </label>
          </div>

          <button
            type="submit"
            className="mt-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-emerald-500 dark:text-slate-900 dark:hover:bg-emerald-400"
          >
            {mode === 'edit' ? 'Save Changes' : 'Add Transaction'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TransactionFormModal
