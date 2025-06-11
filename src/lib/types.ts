export type TransactionType = 'income' | 'expense';

export const expenseCategories = [
  "Food & Dining",
  "Housing",
  "Transportation",
  "Utilities",
  "Health & Wellness",
  "Entertainment",
  "Shopping",
  "Education",
  "Travel",
  "Personal Care",
  "Gifts & Donations",
  "Other",
] as const;

export type ExpenseCategory = typeof expenseCategories[number];

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: Date;
  category?: ExpenseCategory;
}

export interface TransactionFormData {
  amount: number;
  description: string;
  date: Date;
  category?: ExpenseCategory;
}
