import { Transaction, MonthlyData, CategorySpending, Insight } from '@/types/finance';
import { formatCurrency, formatPercent } from './format';

const CATEGORY_COLORS: Record<string, string> = {
  Rent: 'hsl(217, 91%, 60%)',
  Food: 'hsl(38, 92%, 50%)',
  Transport: 'hsl(262, 83%, 58%)',
  Shopping: 'hsl(330, 81%, 60%)',
  Utilities: 'hsl(190, 90%, 50%)',
  Entertainment: 'hsl(142, 71%, 45%)',
  Healthcare: 'hsl(0, 84%, 60%)',
  Salary: 'hsl(142, 71%, 45%)',
  Freelance: 'hsl(172, 66%, 50%)',
  Savings: 'hsl(217, 91%, 60%)',
  Other: 'hsl(220, 9%, 46%)',
};

export function getMonthlyData(transactions: Transaction[]): MonthlyData[] {
  const map = new Map<string, { income: number; expenses: number }>();

  transactions.forEach(t => {
    const month = t.date.substring(0, 7);
    const entry = map.get(month) || { income: 0, expenses: 0 };
    if (t.type === 'income') entry.income += t.amount;
    else entry.expenses += t.amount;
    map.set(month, entry);
  });

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      income: data.income,
      expenses: data.expenses,
      balance: data.income - data.expenses,
    }));
}

export function getCategorySpending(transactions: Transaction[]): CategorySpending[] {
  const expenses = transactions.filter(t => t.type === 'expense' && t.category !== 'Savings');
  const total = expenses.reduce((sum, t) => sum + t.amount, 0);
  const map = new Map<string, number>();

  expenses.forEach(t => {
    map.set(t.category, (map.get(t.category) || 0) + t.amount);
  });

  return Array.from(map.entries())
    .sort(([, a], [, b]) => b - a)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
      color: CATEGORY_COLORS[category] || CATEGORY_COLORS.Other,
    }));
}

export function computeKPIs(transactions: Transaction[]) {
  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expenses;
  const savings = balance;

  // Previous month comparison
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;

  const currentTxns = transactions.filter(t => t.date.startsWith(currentMonth));
  const prevTxns = transactions.filter(t => t.date.startsWith(prevMonth));

  const curIncome = currentTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const prevIncome = prevTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const curExpenses = currentTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const prevExpenses = prevTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  const incomeDelta = prevIncome > 0 ? ((curIncome - prevIncome) / prevIncome) * 100 : 0;
  const expenseDelta = prevExpenses > 0 ? ((curExpenses - prevExpenses) / prevExpenses) * 100 : 0;
  const balanceDelta = prevIncome - prevExpenses !== 0 ? (((curIncome - curExpenses) - (prevIncome - prevExpenses)) / Math.abs(prevIncome - prevExpenses)) * 100 : 0;

  return {
    balance,
    income,
    expenses,
    savings,
    incomeDelta,
    expenseDelta,
    balanceDelta,
    savingsDelta: balanceDelta,
  };
}

export function generateInsights(transactions: Transaction[]): Insight[] {
  const insights: Insight[] = [];
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;

  const currentTxns = transactions.filter(t => t.date.startsWith(currentMonth));
  const prevTxns = transactions.filter(t => t.date.startsWith(prevMonth));

  // Use last month if current month has no data
  const activeTxns = currentTxns.length > 0 ? currentTxns : prevTxns;
  const compTxns = currentTxns.length > 0 ? prevTxns : transactions.filter(t => {
    const d = new Date(now.getFullYear(), now.getMonth() - 2, 1);
    return t.date.startsWith(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  });

  const activeExpenses = activeTxns.filter(t => t.type === 'expense');
  const activeIncome = activeTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const activeExpenseTotal = activeExpenses.reduce((s, t) => s + t.amount, 0);
  const compExpenseTotal = compTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  // Highest spending category
  const catMap = new Map<string, number>();
  activeExpenses.filter(t => t.category !== 'Savings').forEach(t => catMap.set(t.category, (catMap.get(t.category) || 0) + t.amount));
  const topCat = Array.from(catMap.entries()).sort(([, a], [, b]) => b - a)[0];
  if (topCat) {
    insights.push({
      icon: 'TrendingUp',
      title: 'Top Spending Category',
      value: topCat[0],
      description: `${topCat[0]} is your highest spending category at ${formatCurrency(topCat[1])}.`,
      trend: 'neutral',
    });
  }

  // Biggest expense
  const biggest = activeExpenses.sort((a, b) => b.amount - a.amount)[0];
  if (biggest) {
    insights.push({
      icon: 'AlertCircle',
      title: 'Biggest Expense',
      value: formatCurrency(biggest.amount),
      description: `"${biggest.description}" was your largest expense.`,
      trend: 'down',
    });
  }

  // Savings rate
  if (activeIncome > 0) {
    const rate = ((activeIncome - activeExpenseTotal) / activeIncome) * 100;
    insights.push({
      icon: 'PiggyBank',
      title: 'Savings Rate',
      value: `${rate.toFixed(0)}%`,
      description: `You saved ${rate.toFixed(0)}% of your income this month.`,
      trend: rate > 20 ? 'up' : rate > 0 ? 'neutral' : 'down',
    });
  }

  // Monthly spending change
  if (compExpenseTotal > 0) {
    const change = ((activeExpenseTotal - compExpenseTotal) / compExpenseTotal) * 100;
    insights.push({
      icon: 'BarChart3',
      title: 'Spending Change',
      value: formatPercent(change),
      description: `Your expenses are ${change >= 0 ? 'up' : 'down'} ${Math.abs(change).toFixed(1)}% compared to last month.`,
      trend: change <= 0 ? 'up' : 'down',
    });
  }

  // Average expense
  if (activeExpenses.length > 0) {
    const avg = activeExpenseTotal / activeExpenses.length;
    insights.push({
      icon: 'Calculator',
      title: 'Avg Expense',
      value: formatCurrency(avg),
      description: `Your average expense transaction is ${formatCurrency(avg)}.`,
      trend: 'neutral',
    });
  }

  return insights;
}
