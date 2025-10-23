import "@fortawesome/fontawesome-free/css/all.min.css";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import TransactionsList from "./pages/TransactionsList";
import TransactionDetail from "./pages/TransactionDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TransactionsList />} />
      <Route path="/tx/:id" element={<TransactionDetail />} />
    </Routes>
  );
}
