import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Transaction, Filters, UserRole } from '@/types/finance';
import { seedTransactions } from '@/data/mockData';
import { loadFromStorage, saveToStorage } from '@/utils/storage';

interface FinanceContextType {
  transactions: Transaction[];
  filters: Filters;
  role: UserRole;
  theme: 'light' | 'dark';
  globalSearch: string;
  editingTransaction: Transaction | null;
  isFormOpen: boolean;
  setFilters: (f: Partial<Filters>) => void;
  resetFilters: () => void;
  setRole: (r: UserRole) => void;
  setTheme: (t: 'light' | 'dark') => void;
  setGlobalSearch: (s: string) => void;
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  updateTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
  openForm: (t?: Transaction) => void;
  closeForm: () => void;
  filteredTransactions: Transaction[];
}

const defaultFilters: Filters = {
  search: '',
  type: 'all',
  category: 'all',
  sortBy: 'date',
  sortOrder: 'desc',
  dateFrom: '',
  dateTo: '',
};

const FinanceContext = createContext<FinanceContextType | null>(null);

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error('useFinance must be used within FinanceProvider');
  return ctx;
};

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    loadFromStorage('finance_transactions', seedTransactions)
  );
  const [filters, setFiltersState] = useState<Filters>(() =>
    loadFromStorage('finance_filters', defaultFilters)
  );
  const [role, setRoleState] = useState<UserRole>(() =>
    loadFromStorage('finance_role', 'admin' as UserRole)
  );
  const [theme, setThemeState] = useState<'light' | 'dark'>(() =>
    loadFromStorage('finance_theme', 'light' as 'light' | 'dark')
  );
  const [globalSearch, setGlobalSearch] = useState('');
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    saveToStorage('finance_transactions', transactions);
  }, [transactions]);

  useEffect(() => {
    saveToStorage('finance_filters', filters);
  }, [filters]);

  useEffect(() => {
    saveToStorage('finance_role', role);
  }, [role]);

  useEffect(() => {
    saveToStorage('finance_theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const setFilters = useCallback((partial: Partial<Filters>) => {
    setFiltersState(prev => ({ ...prev, ...partial }));
  }, []);

  const resetFilters = useCallback(() => setFiltersState(defaultFilters), []);

  const setRole = useCallback((r: UserRole) => setRoleState(r), []);
  const setTheme = useCallback((t: 'light' | 'dark') => setThemeState(t), []);

  const addTransaction = useCallback((t: Omit<Transaction, 'id'>) => {
    const newT: Transaction = { ...t, id: Math.random().toString(36).substring(2, 11) };
    setTransactions(prev => [newT, ...prev]);
  }, []);

  const updateTransaction = useCallback((t: Transaction) => {
    setTransactions(prev => prev.map(tr => (tr.id === t.id ? t : tr)));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(tr => tr.id !== id));
  }, []);

  const openForm = useCallback((t?: Transaction) => {
    setEditingTransaction(t || null);
    setIsFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setEditingTransaction(null);
    setIsFormOpen(false);
  }, []);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    const searchTerm = (filters.search || globalSearch).toLowerCase();
    if (searchTerm) {
      result = result.filter(
        t =>
          t.description.toLowerCase().includes(searchTerm) ||
          t.category.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.type !== 'all') {
      result = result.filter(t => t.type === filters.type);
    }

    if (filters.category !== 'all') {
      result = result.filter(t => t.category === filters.category);
    }

    if (filters.dateFrom) {
      result = result.filter(t => t.date >= filters.dateFrom);
    }

    if (filters.dateTo) {
      result = result.filter(t => t.date <= filters.dateTo);
    }

    result.sort((a, b) => {
      const mul = filters.sortOrder === 'asc' ? 1 : -1;
      if (filters.sortBy === 'date') return mul * a.date.localeCompare(b.date);
      return mul * (a.amount - b.amount);
    });

    return result;
  }, [transactions, filters, globalSearch]);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        filters,
        role,
        theme,
        globalSearch,
        editingTransaction,
        isFormOpen,
        setFilters,
        resetFilters,
        setRole,
        setTheme,
        setGlobalSearch,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        openForm,
        closeForm,
        filteredTransactions,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
