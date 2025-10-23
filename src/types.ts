export type TransactionType = "Payment" | "Credit";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number; // in USD
  name: string; // merchant or source
  description: string;
  date: string; // ISO date string
  pending?: boolean;
  authorizedUser?: string; // if performed by another person
}

export interface TransactionsFile {
  transactions: Transaction[];
}
