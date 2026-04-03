import { FinanceProvider, useFinance } from '@/context/FinanceContext';
import Header from '@/components/dashboard/Header';
import SummaryCards from '@/components/dashboard/SummaryCards';
import TrendChart from '@/components/dashboard/TrendChart';
import SpendingBreakdownChart from '@/components/dashboard/SpendingBreakdownChart';
import InsightsPanel from '@/components/dashboard/InsightsPanel';
import TransactionFilters from '@/components/dashboard/TransactionFilters';
import TransactionsTable from '@/components/dashboard/TransactionsTable';
import TransactionFormModal from '@/components/dashboard/TransactionFormModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const DashboardContent = () => {
  const { role, openForm, filteredTransactions } = useFinance();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto space-y-6 px-4 py-6">
        {/* KPI Summary */}
        <SummaryCards />

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <TrendChart />
          <SpendingBreakdownChart />
        </div>

        {/* Insights */}
        <InsightsPanel />

        {/* Transactions */}
        <div className="glass-card p-4 sm:p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Transactions</h3>
              <p className="text-xs text-muted-foreground">{filteredTransactions.length} transactions</p>
            </div>
            {role === 'admin' && (
              <Button size="sm" className="gap-1.5" onClick={() => openForm()}>
                <Plus className="h-3.5 w-3.5" />
                Add Transaction
              </Button>
            )}
          </div>
          <TransactionFilters />
          <div className="mt-4">
            <TransactionsTable />
          </div>
        </div>
      </main>

      <TransactionFormModal />
    </div>
  );
};

const Index = () => (
  <FinanceProvider>
    <DashboardContent />
  </FinanceProvider>
);

export default Index;
