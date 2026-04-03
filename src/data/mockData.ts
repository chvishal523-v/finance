import { Transaction } from '@/types/finance';

const generateId = () => Math.random().toString(36).substring(2, 11);

export const seedTransactions: Transaction[] = [
  // October 2025
  { id: generateId(), date: '2025-10-01', description: 'Monthly Salary', amount: 85000, category: 'Salary', type: 'income', paymentMethod: 'Bank Transfer', account: 'HDFC Savings' },
  { id: generateId(), date: '2025-10-03', description: 'Apartment Rent', amount: 22000, category: 'Rent', type: 'expense', paymentMethod: 'Bank Transfer', account: 'HDFC Savings' },
  { id: generateId(), date: '2025-10-05', description: 'Grocery Shopping', amount: 3200, category: 'Food', type: 'expense', paymentMethod: 'UPI', account: 'HDFC Savings' },
  { id: generateId(), date: '2025-10-08', description: 'Uber Ride', amount: 450, category: 'Transport', type: 'expense', paymentMethod: 'UPI', account: 'HDFC Savings' },
  { id: generateId(), date: '2025-10-10', description: 'Netflix Subscription', amount: 649, category: 'Entertainment', type: 'expense', paymentMethod: 'Credit Card', account: 'ICICI Credit' },
  { id: generateId(), date: '2025-10-12', description: 'Freelance Project', amount: 15000, category: 'Freelance', type: 'income', paymentMethod: 'Bank Transfer', account: 'HDFC Savings' },
  { id: generateId(), date: '2025-10-15', description: 'Internet Bill', amount: 1199, category: 'Utilities', type: 'expense', paymentMethod: 'Debit Card', account: 'HDFC Savings' },
  { id: generateId(), date: '2025-10-18', description: 'Doctor Visit', amount: 1500, category: 'Healthcare', type: 'expense', paymentMethod: 'Cash', account: 'Cash' },
  { id: generateId(), date: '2025-10-20', description: 'Restaurant Dinner', amount: 2800, category: 'Food', type: 'expense', paymentMethod: 'Credit Card', account: 'ICICI Credit' },
  { id: generateId(), date: '2025-10-25', description: 'Savings Transfer', amount: 10000, category: 'Savings', type: 'expense', paymentMethod: 'Bank Transfer', account: 'SBI FD' },

  // November 2025
  { id: generateId(), date: '2025-11-01', description: 'Monthly Salary', amount: 85000, category: 'Salary', type: 'income', paymentMethod: 'Bank Transfer', account: 'HDFC Savings' },
  { id: generateId(), date: '2025-11-03', description: 'Apartment Rent', amount: 22000, category: 'Rent', type: 'expense', paymentMethod: 'Bank Transfer', account: 'HDFC Savings' },
  { id: generateId(), date: '2025-11-06', description: 'Electricity Bill', amount: 2100, category: 'Utilities', type: 'expense', paymentMethod: 'UPI', account: 'HDFC Savings' },
  { id: generateId(), date: '2025-11-08', description: 'Online Shopping', amount: 4500, category: 'Shopping', type: 'expense', paymentMethod: 'Credit Card', account: 'ICICI Credit' },
  { id: generateId(), date: '2025-11-10', description: 'Grocery Shopping', amount: 2800, category: 'Food', type: 'expense', paymentMethod: 'UPI', account: 'HDFC Savings' },
  { id: generateId(), date: '2025-11-12', description: 'Metro Card Recharge', amount: 500, category: 'Transport', type: 'expense', paymentMethod: 'UPI', account: 'HDFC Savings' },
  { id: generateId(), date: '2025-11-15', description: 'Freelance Invoice', amount: 20000, category: 'Freelance', type: 'income', paymentMethod: 'Bank Transfer', account: 'HDFC Savings' },
  { id: generateId(), date: '2025-11-18', description: 'Gym Membership', amount: 3000, category: 'Healthcare', type: 'expense', paymentMethod: 'Debit Card', account: 'HDFC Savings' },
  { id: generateId(), date: '2025-11-22', description: 'Movie Tickets', amount: 800, category: 'Entertainment', type: 'expense', paymentMethod: 'UPI', account: 'HDFC Savings' },
  { id: generateId(), date: '2025-11-28', description: 'Savings Transfer', amount: 15000, category: 'Savings', type: 'expense', paymentMethod: 'Bank Transfer', account: 'SBI FD' },

  // December 2025
  { id: generateId(), date: '2025-12-01', description: 'Monthly Salary', amount: 85000, category: 'Salary', type: 'income', paymentMethod: 'Bank Transfer', account: 'HDFC Savings' },
  { id: generateId(), date: '2025-12-03', description: 'Apartment Rent', amount: 22000, category: 'Rent', type: 'expense', paymentMethod: 'Bank Transfer', account: 'HDFC Savings' },
  { id: generateId(), date: '2025-12-05', description: 'Grocery Shopping', amount: 4100, category: 'Food', type: 'expense', paymentMethod: 'UPI', account: 'HDFC Savings' },
  { id: generateId(), date: '2025-12-08', description: 'Year-end Bonus', amount: 40000, category: 'Salary', type: 'income', paymentMethod: 'Bank Transfer', account: 'HDFC Savings' },
  { id: generateId(), date: '2025-12-10', description: 'Holiday Shopping', amount: 12000, category: 'Shopping', type: 'expense', paymentMethod: 'Credit Card', account: 'ICICI Credit' },
  { id: generateId(), date: '2025-12-12', description: 'Flight Tickets', amount: 8500, category: 'Transport', type: 'expense', paymentMethod: 'Credit Card', account: 'ICICI Credit' },
  { id: generateId(), date: '2025-12-15', description: 'Internet Bill', amount: 1199, category: 'Utilities', type: 'expense', paymentMethod: 'Debit Card', account: 'HDFC Savings' },
  { id: generateId(), date: '2025-12-20', description: 'Restaurant Dinner', amount: 3500, category: 'Food', type: 'expense', paymentMethod: 'Credit Card', account: 'ICICI Credit' },
  { id: generateId(), date: '2025-12-25', description: 'Savings Transfer', amount: 20000, category: 'Savings', type: 'expense', paymentMethod: 'Bank Transfer', account: 'SBI FD' },
  { id: generateId(), date: '2025-12-28', description: 'Freelance Project', amount: 18000, category: 'Freelance', type: 'income', paymentMethod: 'Bank Transfer', account: 'HDFC Savings' },

  // January 2026
  { id: generateId(), date: '2026-01-01', description: 'Monthly Salary', amount: 90000, category: 'Salary', type: 'income', paymentMethod: 'Bank Transfer', account: 'HDFC Savings' },
  { id: generateId(), date: '2026-01-03', description: 'Apartment Rent', amount: 22000, category: 'Rent', type: 'expense', paymentMethod: 'Bank Transfer', account: 'HDFC Savings' },
  { id: generateId(), date: '2026-01-05', description: 'Grocery Shopping', amount: 3600, category: 'Food', type: 'expense', paymentMethod: 'UPI', account: 'HDFC Savings' },
  { id: generateId(), date: '2026-01-08', description: 'Uber Rides', amount: 1200, category: 'Transport', type: 'expense', paymentMethod: 'UPI', account: 'HDFC Savings' },
  { id: generateId(), date: '2026-01-10', description: 'Spotify Subscription', amount: 119, category: 'Entertainment', type: 'expense', paymentMethod: 'Credit Card', account: 'ICICI Credit' },
  { id: generateId(), date: '2026-01-12', description: 'Freelance Invoice', amount: 25000, category: 'Freelance', type: 'income', paymentMethod: 'Bank Transfer', account: 'HDFC Savings' },
  { id: generateId(), date: '2026-01-15', description: 'Electricity Bill', amount: 1800, category: 'Utilities', type: 'expense', paymentMethod: 'UPI', account: 'HDFC Savings' },
  { id: generateId(), date: '2026-01-18', description: 'Dental Checkup', amount: 2500, category: 'Healthcare', type: 'expense', paymentMethod: 'Cash', account: 'Cash' },
  { id: generateId(), date: '2026-01-22', description: 'Online Shopping', amount: 6500, category: 'Shopping', type: 'expense', paymentMethod: 'Credit Card', account: 'ICICI Credit' },
  { id: generateId(), date: '2026-01-28', description: 'Savings Transfer', amount: 15000, category: 'Savings', type: 'expense', paymentMethod: 'Bank Transfer', account: 'SBI FD' },

  // February 2026
  { id: generateId(), date: '2026-02-01', description: 'Monthly Salary', amount: 90000, category: 'Salary', type: 'income', paymentMethod: 'Bank Transfer', account: 'HDFC Savings' },
  { id: generateId(), date: '2026-02-03', description: 'Apartment Rent', amount: 22000, category: 'Rent', type: 'expense', paymentMethod: 'Bank Transfer', account: 'HDFC Savings' },
  { id: generateId(), date: '2026-02-06', description: 'Grocery Shopping', amount: 2900, category: 'Food', type: 'expense', paymentMethod: 'UPI', account: 'HDFC Savings' },
  { id: generateId(), date: '2026-02-08', description: 'Valentine Dinner', amount: 4200, category: 'Food', type: 'expense', paymentMethod: 'Credit Card', account: 'ICICI Credit' },
  { id: generateId(), date: '2026-02-10', description: 'Cab Rides', amount: 900, category: 'Transport', type: 'expense', paymentMethod: 'UPI', account: 'HDFC Savings' },
  { id: generateId(), date: '2026-02-12', description: 'Phone Bill', amount: 599, category: 'Utilities', type: 'expense', paymentMethod: 'UPI', account: 'HDFC Savings' },
  { id: generateId(), date: '2026-02-15', description: 'Freelance Project', amount: 22000, category: 'Freelance', type: 'income', paymentMethod: 'Bank Transfer', account: 'HDFC Savings' },
  { id: generateId(), date: '2026-02-20', description: 'Shopping Mall', amount: 5800, category: 'Shopping', type: 'expense', paymentMethod: 'Credit Card', account: 'ICICI Credit' },
  { id: generateId(), date: '2026-02-22', description: 'Concert Tickets', amount: 3500, category: 'Entertainment', type: 'expense', paymentMethod: 'UPI', account: 'HDFC Savings' },
  { id: generateId(), date: '2026-02-28', description: 'Savings Transfer', amount: 12000, category: 'Savings', type: 'expense', paymentMethod: 'Bank Transfer', account: 'SBI FD' },

  // March 2026
  { id: generateId(), date: '2026-03-01', description: 'Monthly Salary', amount: 90000, category: 'Salary', type: 'income', paymentMethod: 'Bank Transfer', account: 'HDFC Savings' },
  { id: generateId(), date: '2026-03-03', description: 'Apartment Rent', amount: 23000, category: 'Rent', type: 'expense', paymentMethod: 'Bank Transfer', account: 'HDFC Savings' },
  { id: generateId(), date: '2026-03-05', description: 'Grocery Shopping', amount: 3400, category: 'Food', type: 'expense', paymentMethod: 'UPI', account: 'HDFC Savings' },
  { id: generateId(), date: '2026-03-07', description: 'Uber Rides', amount: 750, category: 'Transport', type: 'expense', paymentMethod: 'UPI', account: 'HDFC Savings' },
  { id: generateId(), date: '2026-03-10', description: 'Netflix + Spotify', amount: 768, category: 'Entertainment', type: 'expense', paymentMethod: 'Credit Card', account: 'ICICI Credit' },
  { id: generateId(), date: '2026-03-12', description: 'Freelance Invoice', amount: 28000, category: 'Freelance', type: 'income', paymentMethod: 'Bank Transfer', account: 'HDFC Savings' },
  { id: generateId(), date: '2026-03-15', description: 'Internet Bill', amount: 1199, category: 'Utilities', type: 'expense', paymentMethod: 'Debit Card', account: 'HDFC Savings' },
  { id: generateId(), date: '2026-03-18', description: 'Medicine', amount: 850, category: 'Healthcare', type: 'expense', paymentMethod: 'Cash', account: 'Cash' },
  { id: generateId(), date: '2026-03-22', description: 'Online Shopping', amount: 7200, category: 'Shopping', type: 'expense', paymentMethod: 'Credit Card', account: 'ICICI Credit' },
  { id: generateId(), date: '2026-03-25', description: 'Restaurant Dinner', amount: 2600, category: 'Food', type: 'expense', paymentMethod: 'Credit Card', account: 'ICICI Credit' },
  { id: generateId(), date: '2026-03-28', description: 'Savings Transfer', amount: 18000, category: 'Savings', type: 'expense', paymentMethod: 'Bank Transfer', account: 'SBI FD' },
];
