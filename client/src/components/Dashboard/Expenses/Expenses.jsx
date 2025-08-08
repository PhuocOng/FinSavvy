import React, { useContext, useEffect, useState } from 'react';
import { AppContent } from '../../../context/AppContext';
import { FaArrowLeft } from 'react-icons/fa';
import { FaCalendarAlt, FaFileAlt, FaTags, FaMoneyBill, FaExchangeAlt, FaEye, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Expenses.css';

const Expenses = () => {
  const { backendUrl } = useContext(AppContent);
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchExpenses = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/transactions`, {
        withCredentials: true,
      });
      setExpenses(data.transactions || []);
    } catch (error) {
      toast.error('Failed to fetch expenses');
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/transactions/${id}`, {
        withCredentials: true,
      });
      toast.success('Expense deleted');
      fetchExpenses();
    } catch (error) {
      toast.error('Failed to delete expense');
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const openModal = (exp) => {
    setSelectedExpense(exp);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedExpense(null);
    setIsModalOpen(false);
  };

  return (
    <div className="expenses-container">
      <h2 className="expenses-title">All Expenses</h2>

      <div className="table-wrapper">
        <table className="expenses-table">
          <thead>
            <tr className="expenses-header">
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th className="text-right">Amount ($)</th>
              <th className="text-center">Type</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center empty-text">
                  No expenses found.
                </td>
              </tr>
            ) : (
              expenses.map((exp) => {
                const isCredit = parseFloat(exp.amount) < 0;
                return (
                  <tr key={exp._id} className="expenses-row text-center">
                    <td>{new Date(exp.date).toLocaleDateString()}</td>
                    <td>{exp.name}</td>
                    <td>{exp.category}</td>
                    <td className={`text-right amount ${isCredit ? 'green' : 'red'}`}>
                      ${Math.abs(exp.amount).toFixed(2)}
                    </td>
                    <td className="text-center">
                      <span className={`type-badge ${isCredit ? 'credit' : 'debit'}`}>
                        {isCredit ? 'Credit' : 'Debit'}
                      </span>
                    </td>
                    <td className="text-center action-buttons">
                      <button
                        className="view-button"
                        onClick={() => openModal(exp)}
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => deleteExpense(exp._id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedExpense && (
  <>
    <div onClick={closeModal} className="modal-overlay"></div>
    <div className="modal-sidebar">
      <div className="modal-header">
        <button onClick={closeModal} className="back-button">
          <FaArrowLeft />
        </button>
        <div className="modal-title">
          <h3 className={selectedExpense.amount < 0 ? 'green' : 'blue'}>
            ${Math.abs(selectedExpense.amount).toFixed(2)}{' '}
            {selectedExpense.amount < 0 ? 'Credit' : 'Debit'}
          </h3>
          <span>From <strong>you</strong></span>
        </div>
      </div>

      <div className="modal-body new-layout">
        <div className="receipt-box">
          🧾 <span className="receipt-label">Receipt Placeholder</span>
        </div>

        {selectedExpense?.receiptUrl && (
          <a
            href={selectedExpense.receiptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="download-receipt-button"
          >
            📎 View Receipt
          </a>
        )}

        <div className="details">
          <div>
            <p className="label"><FaCalendarAlt /> Date:</p>
            <p>{new Date(selectedExpense.date).toLocaleString()}</p>
          </div>
          <div>
            <p className="label"><FaFileAlt /> Description:</p>
            <p>{selectedExpense.name}</p>
          </div>
          <div>
            <p className="label"><FaTags /> Category:</p>
            <p>{selectedExpense.category}</p>
          </div>
          <div>
            <p className="label"><FaExchangeAlt /> Type:</p>
            <p className={selectedExpense.amount < 0 ? 'green' : 'red'}>
              {selectedExpense.amount < 0 ? 'Credit' : 'Debit'}
            </p>
          </div>
          <div>
            <p className="label"><FaMoneyBill /> Amount:</p>
            <p className="amount-detail">${Math.abs(selectedExpense.amount).toFixed(2)}</p>
          </div>
          <div>
            <p className="label">💳 Payment Method:</p>
            <p>{selectedExpense.paymentMethod
      ? selectedExpense.paymentMethod.charAt(0).toUpperCase() + selectedExpense.paymentMethod.slice(1)
      : '—'}
</p>
          </div>
        </div>
      </div>
    </div>
  </>
)}

    </div>
  );
};

export default Expenses;
