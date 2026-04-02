const monthKey = (value) => value.slice(0, 7)

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)

export const formatDate = (value) =>
  new Date(value).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

export const getSummary = (transactions) => {
  const income = transactions
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0)

  const expenses = transactions
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0)

  return {
    income,
    expenses,
    balance: income - expenses,
  }
}

export const getCategoryTotals = (transactions) => {
  const expenseItems = transactions.filter((item) => item.type === 'expense')
  const grouped = expenseItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount
    return acc
  }, {})

  return Object.entries(grouped)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

export const getMonthlyTrend = (transactions) => {
  const grouped = transactions.reduce((acc, item) => {
    const key = monthKey(item.date)
    if (!acc[key]) {
      acc[key] = {
        month: key,
        income: 0,
        expense: 0,
      }
    }
    if (item.type === 'income') {
      acc[key].income += item.amount
    } else {
      acc[key].expense += item.amount
    }
    return acc
  }, {})

  return Object.values(grouped)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((item) => ({
      ...item,
      balance: item.income - item.expense,
      label: new Date(`${item.month}-01`).toLocaleDateString('en-US', {
        month: 'short',
        year: '2-digit',
      }),
    }))
}

export const applyFilters = ({
  transactions,
  search,
  typeFilter,
  selectedCategories,
  dateFrom,
  dateTo,
  sortBy,
}) => {
  const filtered = transactions
    .filter((item) =>
      typeFilter === 'all' ? true : item.type.toLowerCase() === typeFilter,
    )
    .filter((item) =>
      selectedCategories.length ? selectedCategories.includes(item.category) : true,
    )
    .filter((item) => (dateFrom ? item.date >= dateFrom : true))
    .filter((item) => (dateTo ? item.date <= dateTo : true))
    .filter((item) => {
      if (!search.trim()) {
        return true
      }
      const token = search.toLowerCase()
      return (
        item.title.toLowerCase().includes(token) ||
        item.category.toLowerCase().includes(token) ||
        item.type.toLowerCase().includes(token)
      )
    })

  const sorted = [...filtered]

  if (sortBy === 'dateDesc') {
    sorted.sort((a, b) => b.date.localeCompare(a.date))
  }
  if (sortBy === 'dateAsc') {
    sorted.sort((a, b) => a.date.localeCompare(b.date))
  }
  if (sortBy === 'amountDesc') {
    sorted.sort((a, b) => b.amount - a.amount)
  }
  if (sortBy === 'amountAsc') {
    sorted.sort((a, b) => a.amount - b.amount)
  }

  return sorted
}

export const toCsv = (transactions) => {
  const header = ['id', 'date', 'title', 'category', 'type', 'amount']
  const rows = transactions.map((item) =>
    [item.id, item.date, item.title, item.category, item.type, item.amount]
      .map((value) => `"${String(value).replaceAll('"', '""')}"`)
      .join(','),
  )
  return [header.join(','), ...rows].join('\n')
}

export const downloadFile = (content, fileName, type) => {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export const getInsights = (transactions) => {
  const monthlyTrend = getMonthlyTrend(transactions)
  const categoryTotals = getCategoryTotals(transactions)

  const highestCategory = categoryTotals[0]
    ? `${categoryTotals[0].name} (${formatCurrency(categoryTotals[0].value)})`
    : 'No expense data'

  const latestMonth = monthlyTrend[monthlyTrend.length - 1]
  const previousMonth = monthlyTrend[monthlyTrend.length - 2]

  const monthlyComparison =
    latestMonth && previousMonth
      ? latestMonth.balance - previousMonth.balance
      : 0

  const averageExpense =
    transactions.filter((item) => item.type === 'expense').length > 0
      ? transactions
          .filter((item) => item.type === 'expense')
          .reduce((sum, item) => sum + item.amount, 0) /
        transactions.filter((item) => item.type === 'expense').length
      : 0

  return {
    highestCategory,
    monthlyComparison,
    averageExpense,
  }
}
