import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Legend,
} from 'recharts'
import { formatCurrency } from '../../utils/finance'

function BalanceTrendChart({ data }) {
  return (
    <div className="h-72 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.38} />
              <stop offset="55%" stopColor="#8b5cf6" stopOpacity={0.16} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.35} />
          <XAxis dataKey="label" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `₹${value}`} />
          <Tooltip
            formatter={(value) => formatCurrency(value)}
            contentStyle={{ borderRadius: '12px', borderColor: '#94a3b8' }}
          />
          <Legend />
          <Bar dataKey="income" name="Income" fill="#38bdf8" radius={[8, 8, 0, 0]} />
          <Bar dataKey="expense" name="Expense" fill="#34d399" radius={[8, 8, 0, 0]} />
          <Line
            type="monotone"
            dataKey="balance"
            name="Balance"
            stroke="#8b5cf6"
            strokeWidth={4}
            dot={{ r: 5, fill: '#8b5cf6', strokeWidth: 0 }}
            activeDot={{ r: 7 }}
            connectNulls
          />
          <Area type="monotone" dataKey="balance" fill="url(#balanceAreaGradient)" stroke="none" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BalanceTrendChart
