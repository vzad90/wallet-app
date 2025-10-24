import { useParams, Link } from "react-router-dom";

import data from "../data/transactions.json";
import type { Transaction } from "../types";
import { formatCurrencyUSD } from "../utils/format";

export default function TransactionDetail() {
  const { id } = useParams();
  const tx = (data.transactions as Transaction[]).find((t) => t.id === id);
  const total = formatCurrencyUSD(tx?.amount ?? 0);

  return tx ? (
    <div className="screen">
      <header className="header">
        <Link className="back" to="/">
          ←
        </Link>
        <h1>Transaction</h1>
      </header>
      <div className="tx-detail">
        <div className="tx-detail-amount">{total}</div>
        <div className="tx-detail-row">
          <div className="tx-detail-text">{tx.name}</div>
          <div className="tx-detail-text">
            {new Date(tx.date).toLocaleString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </div>
        </div>
        <div className="card detail-card">
          <p className="label">Status: {tx.pending ? "Pending" : "Approved"}</p>
          <p className="value">RBC Bank Debit Card</p>
          <div className="row total">
            <p className="label">Total</p>
            <p className="label">{total}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="screen">
      <header className="header">
        <Link className="back" to="/">
          ←
        </Link>
        <h1>Transaction</h1>
      </header>
      <p>Transaction not found.</p>
    </div>
  );
}
