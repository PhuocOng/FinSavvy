import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { usePlaidLink } from "react-plaid-link";
import {
  Calendar,
  Filter,
  TrendingUp,
  DollarSign,
  CreditCard,
  ShoppingCart,
} from "lucide-react";
import axios from "axios";
import TransactionTable from "../../components/Dashboard/TransactionTable";
import PieChart from "../../components/Dashboard/PieChart";
import BarChart from "../../components/Dashboard/BarChart";
import FilterByDate from "../../components/Dashboard/FilterByDate";
import FilterByCategory from "../../components/Dashboard/FilterByCategory";
import "./Dashboard.css";
import ChatBot from "../ChatBot/ChatBot";
import AddExpenseForm from "../../components/AddExpense/AddExpenseForm";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [isBankLinked, setIsBankLinked] = useState(false);
  const [linkToken, setLinkToken] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const action = searchParams.get("action"); // "add" or "connect"
  const actionHandledRef = useRef(false);

  const fetchTransactions = useCallback(() => {
    axios
      .get("/api/transactions", { withCredentials: true })
      .then((res) => {
        const txns = Array.isArray(res?.data?.transactions)
          ? res.data.transactions
          : [];
        setTransactions(txns);

        const categories = Array.from(
          new Set(txns.map((txn) => txn.category))
        ).sort();
        setCategoryOptions(categories);
      })
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [isBankLinked, fetchTransactions]);

  useEffect(() => {
    let result = [...transactions];
    if (categoryFilter) {
      result = result.filter((txn) => txn.category === categoryFilter);
    }
    if (dateFilter.from && dateFilter.to) {
      result = result.filter((txn) => {
        const txnDate = new Date(txn.date);
        return (
          txnDate >= new Date(dateFilter.from) &&
          txnDate <= new Date(dateFilter.to)
        );
      });
    }
    setFilteredTransactions(result);
  }, [categoryFilter, dateFilter, transactions]);

  const generateToken = useCallback(async () => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.post(
        "/api/plaid/create_link_token",
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setLinkToken(response.data.link_token);
    } catch (error) {
      console.error("Failed to create link token", error);
    }
  }, []);

  useEffect(() => {
    generateToken();
  }, [generateToken]);

  const onSuccess = useCallback(async (public_token) => {
    const authToken = localStorage.getItem("token");
    try {
      await axios.post(
        "/api/plaid/exchange_public_token",
        { public_token },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      alert("Bank account linked! Syncing transactions now...");
      await axios.post(
        "/api/plaid/sync-transactions",
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      alert("Sync complete!");

      setIsBankLinked((prev) => !prev);
    } catch (error) {
      console.error("Failed to exchange token or sync transactions:", error);
      alert("Could not complete the bank linking process.");
    }
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  });
  // Trigger deep-linked actions: ?action=add or ?action=connect
  // Trigger deep-linked actions: ?action=add or ?action=connect
  useEffect(() => {
    if (actionHandledRef.current) return;
    if (!action) return;

    if (action === "add") {
      setShowAddForm(true);
      actionHandledRef.current = true;
      setSearchParams((prev) => {
        const p = new URLSearchParams(prev);
        p.delete("action");
        return p;
      });
      return;
    }

    if (action === "connect") {
      // wait until we actually have a token and Plaid is ready
      const tryOpen = () => {
        if (linkToken && ready) {
          open();
          actionHandledRef.current = true;
          setSearchParams((prev) => {
            const p = new URLSearchParams(prev);
            p.delete("action");
            return p;
          });
        }
      };
      tryOpen();
      const id = setInterval(tryOpen, 200);
      return () => clearInterval(id);
    }
  }, [action, linkToken, ready, open, setSearchParams]);

  const totalIncome = useMemo(
    () =>
      filteredTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    [filteredTransactions]
  );
  const totalExpenses = useMemo(
    () =>
      filteredTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    [filteredTransactions]
  );
  const netAmount = totalIncome - totalExpenses;

  const handleAddManualExpense = (newExpense) => {
    setTransactions((prev) => [...prev, newExpense]);
  };

  const handleDeleteTransaction = (id) => {
    axios
      .delete(`/api/transactions/${id}`, { withCredentials: true })
      .then(() => {
        const updatedTransactions = transactions.filter((t) => t._id !== id);
        setTransactions(updatedTransactions);
      })
      .catch((err) => {
        console.error("Error deleting transaction:", err);
      });
  };

  const clearFilters = () => {
    setDateFilter({ from: "", to: "" });
    setCategoryFilter("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 dark:from-gray-900 dark:to-gray-800 p-0">
      <div className="max-w-6xl mx-auto mt-0">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-300 mb-2">
            Transaction Dashboard
          </h1>
          <p className="text-blue-700 dark:text-blue-400">
            Visualize your spendings and stay on top of your finances
          </p>
        </div>

        <div className="flex flex-wrap gap-6 items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md mb-8">
          <FilterByDate dateFilter={dateFilter} setDateFilter={setDateFilter} />
          <FilterByCategory
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            categories={categoryOptions}
          />
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            Clear Filters
          </button>
          <button
            onClick={() => setShowAddForm((prev) => !prev)}
            className="px-4 py-2 bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            Add Expense
          </button>
          <button
            onClick={() => open()}
            disabled={!ready}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-600 text-white dark:text-white rounded-lg hover:bg-blue-500 dark:hover:bg-blue-500 transition-colors font-medium"
          >
            Link Bank Account
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <PieChart data={filteredTransactions} />
          <BarChart data={filteredTransactions} />
        </div>

        <TransactionTable
          transactions={filteredTransactions}
          onDelete={handleDeleteTransaction}
        />

        <ChatBot />

        {showAddForm && (
          <>
            <div className="overlay" onClick={() => setShowAddForm(false)} />
            {/* Add dark classes to the slide-in panel */}
            <div className="add-expense-panel show dark:bg-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Add Expense
                </h2>
              </div>
              <div className="add-expense-form">
                <AddExpenseForm
                  onClose={() => setShowAddForm(false)}
                  onAdd={(expense) => {
                    handleAddManualExpense(expense);
                    setShowAddForm(false);
                  }}
                  categoryOptions={categoryOptions}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
