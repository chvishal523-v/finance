import { useFinance } from '@/context/FinanceContext';
import { generateInsights } from '@/utils/insights';
import { TrendingUp, TrendingDown, Minus, Lightbulb } from 'lucide-react';

const trendIcons = {
  up: <TrendingUp className="h-4 w-4 text-success" />,
  down: <TrendingDown className="h-4 w-4 text-destructive" />,
  neutral: <Minus className="h-4 w-4 text-muted-foreground" />,
};

const InsightsPanel = () => {
  const { transactions } = useFinance();
  const insights = generateInsights(transactions);

  if (insights.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center justify-center p-8">
        <Lightbulb className="mb-2 h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Add transactions to see insights.</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-warning" />
        <h3 className="text-sm font-semibold text-foreground">Insights</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl border border-border bg-secondary/50 p-3 transition-colors hover:bg-secondary"
          >
            <div className="mt-0.5">{trendIcons[insight.trend || 'neutral']}</div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{insight.title}</p>
              <p className="text-sm font-semibold text-foreground">{insight.value}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsPanel;
