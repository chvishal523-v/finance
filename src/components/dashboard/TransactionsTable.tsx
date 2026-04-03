import { useFinance } from '@/context/FinanceContext';
import { formatCurrency, formatDate } from '@/utils/format';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import EmptyState from './EmptyState';

const TransactionsTable = () => {
  const { filteredTransactions, role, openForm, deleteTransaction } = useFinance();

  if (filteredTransactions.length === 0) {
    return <EmptyState context="transactions" />;
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Description</th>
              <th className="pb-3 font-medium">Category</th>
              <th className="pb-3 font-medium">Method</th>
              <th className="pb-3 text-right font-medium">Amount</th>
              {role === 'admin' && <th className="pb-3 text-right font-medium">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredTransactions.map(t => (
              <tr key={t.id} className="transition-colors hover:bg-secondary/50">
                <td className="py-3 text-muted-foreground">{formatDate(t.date)}</td>
                <td className="py-3 font-medium text-foreground">{t.description}</td>
                <td className="py-3">
                  <Badge variant="secondary" className="text-xs font-normal">
                    {t.category}
                  </Badge>
                </td>
                <td className="py-3 text-muted-foreground">{t.paymentMethod}</td>
                <td className={`py-3 text-right font-semibold ${t.type === 'income' ? 'text-success' : 'text-destructive'}`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </td>
                {role === 'admin' && (
                  <td className="py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => openForm(t)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                        onClick={() => {
                          if (window.confirm('Delete this transaction?')) deleteTransaction(t.id);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-2 md:hidden">
        {filteredTransactions.map(t => (
          <div key={t.id} className="flex items-center justify-between rounded-xl border border-border bg-secondary/30 p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{t.description}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{formatDate(t.date)}</span>
                <Badge variant="secondary" className="text-[10px] font-normal">{t.category}</Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${t.type === 'income' ? 'text-success' : 'text-destructive'}`}>
                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
              </span>
              {role === 'admin' && (
                <div className="flex gap-0.5">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => openForm(t)}>
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-destructive"
                    onClick={() => {
                      if (window.confirm('Delete this transaction?')) deleteTransaction(t.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TransactionsTable;
