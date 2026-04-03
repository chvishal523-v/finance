import { useFinance } from '@/context/FinanceContext';
import { Inbox, SearchX, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  context: 'transactions' | 'chart' | 'dashboard';
}

const EmptyState = ({ context }: EmptyStateProps) => {
  const { role, openForm, filters, resetFilters } = useFinance();

  const hasFilters = filters.search || filters.type !== 'all' || filters.category !== 'all' || filters.dateFrom || filters.dateTo;

  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <SearchX className="mb-3 h-10 w-10 text-muted-foreground/50" />
        <p className="text-sm font-medium text-foreground">No results found</p>
        <p className="mt-1 text-xs text-muted-foreground">Try changing your filters</p>
        <Button variant="outline" size="sm" className="mt-3" onClick={resetFilters}>
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Inbox className="mb-3 h-10 w-10 text-muted-foreground/50" />
      <p className="text-sm font-medium text-foreground">No transactions yet</p>
      <p className="mt-1 text-xs text-muted-foreground">
        {role === 'admin' ? 'Add your first transaction to get started' : 'No transactions to display'}
      </p>
      {role === 'admin' && (
        <Button size="sm" className="mt-3 gap-1.5" onClick={() => openForm()}>
          <Plus className="h-3.5 w-3.5" />
          Add Transaction
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
