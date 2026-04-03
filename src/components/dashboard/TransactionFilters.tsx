import { useFinance } from '@/context/FinanceContext';
import { Category } from '@/types/finance';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';

const categories: Category[] = [
  'Rent', 'Food', 'Transport', 'Shopping', 'Utilities',
  'Entertainment', 'Healthcare', 'Salary', 'Freelance', 'Savings', 'Other',
];

const TransactionFilters = () => {
  const { filters, setFilters, resetFilters } = useFinance();

  const hasActiveFilters =
    filters.search || filters.type !== 'all' || filters.category !== 'all' || filters.dateFrom || filters.dateTo;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative w-full sm:w-44">
        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={filters.search}
          onChange={e => setFilters({ search: e.target.value })}
          className="h-8 pl-8 text-sm"
        />
      </div>

      <Select value={filters.type} onValueChange={v => setFilters({ type: v as any })}>
        <SelectTrigger className="h-8 w-28 text-xs">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="expense">Expense</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.category} onValueChange={v => setFilters({ category: v as any })}>
        <SelectTrigger className="h-8 w-32 text-xs">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map(c => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.sortBy} onValueChange={v => setFilters({ sortBy: v as any })}>
        <SelectTrigger className="h-8 w-28 text-xs">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="amount">Amount</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="sm"
        className="h-8 text-xs"
        onClick={() => setFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
      >
        {filters.sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
      </Button>

      <Input
        type="date"
        value={filters.dateFrom}
        onChange={e => setFilters({ dateFrom: e.target.value })}
        className="h-8 w-32 text-xs"
        placeholder="From"
      />
      <Input
        type="date"
        value={filters.dateTo}
        onChange={e => setFilters({ dateTo: e.target.value })}
        className="h-8 w-32 text-xs"
        placeholder="To"
      />

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs text-muted-foreground" onClick={resetFilters}>
          <X className="h-3 w-3" />
          Clear
        </Button>
      )}
    </div>
  );
};

export default TransactionFilters;
