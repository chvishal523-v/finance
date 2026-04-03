export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Rent'
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Utilities'
  | 'Entertainment'
  | 'Healthcare'
  | 'Salary'
  | 'Freelance'
  | 'Savings'
  | 'Other';

export type PaymentMethod = 'Cash' | 'Credit Card' | 'Debit Card' | 'Bank Transfer' | 'UPI';

export type UserRole = 'viewer' | 'admin';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
  paymentMethod: PaymentMethod;
  account: string;
}

export interface Filters {
  search: string;
  type: TransactionType | 'all';
  category: Category | 'all';
  sortBy: 'date' | 'amount';
  sortOrder: 'asc' | 'desc';
  dateFrom: string;
  dateTo: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface Insight {
  icon: string;
  title: string;
  value: string;
  description: string;
  trend?: 'up' | 'down' | 'neutral';
}
