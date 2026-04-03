import { useFinance } from '@/context/FinanceContext';
import { getCategorySpending } from '@/utils/insights';
import { formatCurrency } from '@/utils/format';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const SpendingBreakdownChart = () => {
  const { transactions } = useFinance();
  const data = getCategorySpending(transactions);

  if (data.length === 0) {
    return (
      <div className="glass-card flex h-72 flex-col items-center justify-center p-6">
        <p className="text-sm text-muted-foreground">No spending data available.</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 sm:p-6">
      <h3 className="mb-4 text-sm font-semibold text-foreground">Spending by Category</h3>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <ResponsiveContainer width="100%" height={220} className="max-w-[220px]">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              dataKey="amount"
              nameKey="category"
              stroke="none"
              paddingAngle={2}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.75rem',
                fontSize: 12,
              }}
              formatter={(value: number) => formatCurrency(value)}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-1.5">
          {data.map(entry => (
            <div key={entry.category} className="flex items-center gap-2 text-xs">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-muted-foreground">{entry.category}</span>
              <span className="ml-auto font-medium text-foreground">{entry.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingBreakdownChart;
