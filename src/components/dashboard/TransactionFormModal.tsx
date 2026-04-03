import { useState, useEffect } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Transaction, Category, PaymentMethod, TransactionType } from '@/types/finance';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const categories: Category[] = [
  'Rent', 'Food', 'Transport', 'Shopping', 'Utilities',
  'Entertainment', 'Healthcare', 'Salary', 'Freelance', 'Savings', 'Other',
];
const paymentMethods: PaymentMethod[] = ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'UPI'];

const TransactionFormModal = () => {
  const { isFormOpen, closeForm, editingTransaction, addTransaction, updateTransaction } = useFinance();

  const [form, setForm] = useState({
    date: '',
    description: '',
    amount: '',
    category: 'Food' as Category,
    type: 'expense' as TransactionType,
    paymentMethod: 'UPI' as PaymentMethod,
    account: 'HDFC Savings',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        date: editingTransaction.date,
        description: editingTransaction.description,
        amount: editingTransaction.amount.toString(),
        category: editingTransaction.category,
        type: editingTransaction.type,
        paymentMethod: editingTransaction.paymentMethod,
        account: editingTransaction.account,
      });
    } else {
      setForm({
        date: new Date().toISOString().split('T')[0],
        description: '',
        amount: '',
        category: 'Food',
        type: 'expense',
        paymentMethod: 'UPI',
        account: 'HDFC Savings',
      });
    }
    setErrors({});
  }, [editingTransaction, isFormOpen]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.date) e.date = 'Required';
    if (!form.description.trim()) e.description = 'Required';
    if (!form.amount || parseFloat(form.amount) <= 0) e.amount = 'Enter a valid amount';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    const data = {
      date: form.date,
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      category: form.category,
      type: form.type,
      paymentMethod: form.paymentMethod,
      account: form.account,
    };

    if (editingTransaction) {
      updateTransaction({ ...data, id: editingTransaction.id });
    } else {
      addTransaction(data);
    }
    closeForm();
  };

  return (
    <Dialog open={isFormOpen} onOpenChange={open => !open && closeForm()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{editingTransaction ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className="mt-1 h-9 text-sm"
              />
              {errors.date && <p className="mt-0.5 text-xs text-destructive">{errors.date}</p>}
            </div>
            <div>
              <Label className="text-xs">Type</Label>
              <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v as TransactionType }))}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-xs">Description</Label>
            <Input
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="e.g. Grocery shopping"
              className="mt-1 h-9 text-sm"
            />
            {errors.description && <p className="mt-0.5 text-xs text-destructive">{errors.description}</p>}
          </div>

          <div>
            <Label className="text-xs">Amount (₹)</Label>
            <Input
              type="number"
              value={form.amount}
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              placeholder="0"
              min="0"
              step="0.01"
              className="mt-1 h-9 text-sm"
            />
            {errors.amount && <p className="mt-0.5 text-xs text-destructive">{errors.amount}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Category</Label>
              <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v as Category }))}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Payment Method</Label>
              <Select value={form.paymentMethod} onValueChange={v => setForm(f => ({ ...f, paymentMethod: v as PaymentMethod }))}>
                <SelectTrigger className="mt-1 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-xs">Account</Label>
            <Input
              value={form.account}
              onChange={e => setForm(f => ({ ...f, account: e.target.value }))}
              className="mt-1 h-9 text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={closeForm}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {editingTransaction ? 'Save Changes' : 'Add Transaction'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionFormModal;
