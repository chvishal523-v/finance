import { Transaction } from '@/types/finance';
import { formatDate, formatCurrency } from './format';

export const exportToCSV = (transactions: Transaction[], filename = 'transactions.csv') => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount', 'Payment Method', 'Account'];
  const rows = transactions.map(t => [
    formatDate(t.date),
    t.description,
    t.category,
    t.type,
    t.amount.toString(),
    t.paymentMethod,
    t.account,
  ]);

  const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  downloadFile(csv, filename, 'text/csv');
};

export const exportToJSON = (transactions: Transaction[], filename = 'transactions.json') => {
  const json = JSON.stringify(transactions, null, 2);
  downloadFile(json, filename, 'application/json');
};

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
