import { useFinance } from '@/context/FinanceContext';
import { Search, Download, Moon, Sun, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { exportToCSV, exportToJSON } from '@/utils/export';

const Header = () => {
  const { role, setRole, theme, setTheme, globalSearch, setGlobalSearch, filteredTransactions, transactions } = useFinance();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <span className="text-sm font-bold text-primary-foreground">₹</span>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight text-foreground">Finance Dashboard</h1>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Track balances, spending, and financial activity
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-48">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={globalSearch}
              onChange={e => setGlobalSearch(e.target.value)}
              className="h-8 pl-8 text-sm"
            />
          </div>

          {/* Role Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                <User className="h-3.5 w-3.5" />
                <span className="capitalize">{role}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setRole('viewer')}>
                Viewer
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRole('admin')}>
                Admin
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Export */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => exportToCSV(filteredTransactions, 'filtered_transactions.csv')}>
                Export Filtered (CSV)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportToCSV(transactions, 'all_transactions.csv')}>
                Export All (CSV)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportToJSON(filteredTransactions, 'filtered_transactions.json')}>
                Export Filtered (JSON)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportToJSON(transactions, 'all_transactions.json')}>
                Export All (JSON)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
          </Button>

          {/* Avatar */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
