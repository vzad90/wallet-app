import type { Transaction } from "../types";

export function randomBalance(transactions: Transaction[] = []): number {
  const seed = transactions.length * 97;
  const x = Math.sin(seed) * 10000;
  const val = x - Math.floor(x);
  return Math.round(val * 500) + 10;
}
