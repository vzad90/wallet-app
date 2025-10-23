import { Link } from "react-router-dom";
import data from "../data/transactions.json";

import type { Transaction } from "../types";
import { calculateTodayPointsK } from "../utils/points";
import { formatCurrencyUSD, formatDayOrDate } from "../utils/format";
import { randomBalance } from "../utils/randomBalance";

const MAX_LIMIT = 1500;

export default function TransactionsList() {
  const balance = randomBalance(data.transactions as Transaction[]);
  const available = MAX_LIMIT - balance;
  const points = calculateTodayPointsK();
  const list = data.transactions.slice(0, 10) as Transaction[];

  return (
    <div className="screen">
      <header className="header">
        <h1>Card Balance</h1>
      </header>
      <section className="cards">
        <div className="card">
          <div className="card-title">Card Balance</div>
          <div className="card-balance">{formatCurrencyUSD(balance)}</div>
          <div className="card-sub">
            {formatCurrencyUSD(available)} Available
          </div>
        </div>
        <div className="card">
          <div className="card-title">No Payment Due</div>
          <div className="card-sub">You've paid your balance.</div>
        </div>
        <div className="card">
          <div className="card-title">Daily Points</div>
          <div className="card-points">{points}</div>
        </div>
      </section>

      <h2 className="section-title">Latest Transactions</h2>
      <ul className="tx-list">
        {list.map((t) => (
          <li key={t.id} className="tx-item">
            <Link to={`/tx/${t.id}`} className="tx-link">
              <div className="tx-icon">
                <i
                  className={`fa-solid ${
                    t.type === "Payment"
                      ? "fa-circle-check"
                      : "fa-cart-shopping"
                  }`}
                  aria-hidden="true"
                />
              </div>
              <div className="tx-main">
                <div className="tx-row">
                  <div className="tx-name">{t.name}</div>
                  <div
                    className={`tx-amount ${
                      t.type === "Payment" ? "positive" : "negative"
                    }`}
                  >
                    {t.type === "Payment" ? "+" : "-"}
                    {formatCurrencyUSD(t.amount)}
                  </div>
                </div>
                <div className="tx-sub">
                  {t.pending ? "Pending — " : ""}
                  {t.authorizedUser ? `${t.authorizedUser} — ` : ""}
                  {formatDayOrDate(t.date)}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
