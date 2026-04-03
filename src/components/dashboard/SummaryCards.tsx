import { useFinance } from '@/context/FinanceContext';
import { computeKPIs } from '@/utils/insights';
import { formatCurrency, formatPercent } from '@/utils/format';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

const cards = [
  { key: 'balance' as const, label: 'Total Balance', icon: Wallet, colorClass: 'text-primary' },
  { key: 'income' as const, label: 'Income', icon: TrendingUp, colorClass: 'text-success' },
  { key: 'expenses' as const, label: 'Expenses', icon: TrendingDown, colorClass: 'text-destructive' },
  { key: 'savings' as const, label: 'Net Savings', icon: PiggyBank, colorClass: 'text-primary' },
];

const SummaryCards = () => {
  const { transactions } = useFinance();
  const kpis = computeKPIs(transactions);

  const deltas: Record<string, number> = {
    balance: kpis.balanceDelta,
    income: kpis.incomeDelta,
    expenses: kpis.expenseDelta,
    savings: kpis.savingsDelta,
  };

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map(({ key, label, icon: Icon, colorClass }, i) => (
        <div
          key={key}
          className="glass-card animate-slide-up p-4 sm:p-5"
          style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">{label}</span>
            <Icon className={`h-4 w-4 ${colorClass}`} />
          </div>
          <p className="mt-2 text-xl font-bold text-foreground sm:text-2xl">
            {formatCurrency(kpis[key])}
          </p>
          <p
            className={`mt-1 text-xs font-medium ${
              deltas[key] >= 0 ? 'text-success' : 'text-destructive'
            }`}
          >
            {formatPercent(deltas[key])} vs last month
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
