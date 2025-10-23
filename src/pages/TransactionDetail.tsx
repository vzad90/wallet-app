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
        <div className="tx-detail-name">{tx.name}</div>
        <div className="tx-detail-date">
          {new Date(tx.date).toLocaleString()}
        </div>

        <div className="card detail-card">
          <div className="row">
            <div className="label">Status</div>
            <div className="value">{tx.pending ? "Pending" : "Approved"}</div>
          </div>
          <div className="row">
            <div className="label">Method</div>
            <div className="value">RBC Bank Debit Card</div>
          </div>
          <div className="row total">
            <div className="label">Total</div>
            <div className="value">{total}</div>
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
