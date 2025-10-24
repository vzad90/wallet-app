import { Link } from "react-router-dom";
import data from "../data/transactions.json";

import type { Transaction } from "../types";
import { calculateTodayPointsK } from "../utils/points";
import { formatCurrencyUSD, formatDayOrDate } from "../utils/format";
import { randomBalance } from "../utils/randomBalance";

const MAX_LIMIT = 1500;

const darks = [
  "#111827",
  "#1f2937",
  "#374151",
  "#334155",
  "#4b5563",
  "#0f172a",
];
const pickDark = (key: string) =>
  darks[
    key
      .split("")
      .reduce((acc, ch) => (acc + ch.charCodeAt(0)) % darks.length, 0)
  ];

function getCashbackPercent(t: Transaction): number | null {
  if (t.type !== "Credit") return null;
  if (t.name === "Apple") return 3;
  return 2;
}

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
        <div className="cards-row">
          <div className="card">
            <div className="card-title">Card Balance</div>
            <div className="card-balance">{formatCurrencyUSD(balance)}</div>
            <div className="card-sub">
              {formatCurrencyUSD(available)} Available
            </div>
          </div>
          <div className="card">
            <div className="card-title">Daily Points</div>
            <div className="card-points">{points}</div>
          </div>
        </div>
        <div className="card">
          <div>
            <div className="card-title">No Payment Due</div>
            <div className="card-sub">You've paid your balance.</div>
          </div>
          <div className="card-circle">
            <i className="fa-solid fa-check"></i>
          </div>
        </div>
      </section>

      <h2 className="section-title">Latest Transactions</h2>
      <ul className="tx-list">
        {list.map((t) => (
          <li key={t.id} className="tx-item">
            <Link to={`/tx/${t.id}`} className="tx-link">
              <div
                className="tx-icon"
                style={{ backgroundColor: pickDark(t.id) }}
              >
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
                  <div className="tx-amount-row">
                    <div
                      className={`tx-amount ${
                        t.type === "Payment" ? "positive" : "negative"
                      }`}
                    >
                      {t.type === "Payment" ? "+" : "-"}
                      {formatCurrencyUSD(t.amount)}
                    </div>
                    <i className="arrow fa-solid fa-angle-right"/>
                  </div>
                </div>
                <div className="tx-sub-row">
                  <span>
                    {[t.pending ? "Pending" : null, t.description || null]
                      .filter((p): p is string => Boolean(p))
                      .join(" — ")}
                  </span>
                  {(() => {
                    const p = getCashbackPercent(t);
                    return p ? <span className="badge">{p}%</span> : null;
                  })()}
                </div>
                <div className="tx-sub">
                  {[
                    t.authorizedUser &&
                    !(t.description || "").includes(t.authorizedUser)
                      ? t.authorizedUser
                      : null,
                    formatDayOrDate(t.date),
                  ]
                    .filter((p): p is string => Boolean(p))
                    .join(" — ")}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
