import React, { useContext, useEffect, useState } from 'react';
import { AppContent } from '../../context/AppContext';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

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
    <div className="min-h-screen bg-blue-50 py-10 px-5 md:px-20">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Expenses</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="p-4">Date</th>
              <th className="p-4">Description</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-right">Amount ($)</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No expenses found.
                </td>
              </tr>
            ) : (
              expenses.map((exp) => (
                <tr key={exp._id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{new Date(exp.date).toLocaleDateString()}</td>
                  <td className="p-4">{exp.name}</td>
                  <td className="p-4">{exp.category}</td>
                  <td className="p-4 text-right text-red-600 font-medium">${exp.amount}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => openModal(exp)}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedExpense && (
        <>
          <div
            onClick={closeModal}
            className="fixed inset-0 bg-black/30 z-40"
          ></div>

          {/* Modal Sidebar */}
          <div className="fixed top-0 right-0 w-[350px] sm:w-[400px] h-full bg-white shadow-lg z-50 transition-transform duration-300">
            <div className="flex items-start px-5 py-4">
              <button
                onClick={closeModal}
                className="text-lg font-bold text-gray-600"
              >
                <FaArrowLeft />
              </button>
               <div className="flex flex-col">
                <h3 className="text-blue-600 font-semibold text-lg">
                ${selectedExpense.amount.toFixed(2)} expense
              </h3>
              <span className="text-sm text-gray-500">
                From <strong>you</strong>
              </span>
               </div>
            </div>

            <div className="p-5">
              <div className="border border-dashed border-gray-300 rounded-md h-32 flex items-center justify-center mb-5 text-gray-400 text-sm">
                📄 Receipt Placeholder
              </div>

              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="text-xs text-gray-500">Amount • Cash</p>
                  <p className="text-base font-medium">
                    ${selectedExpense.amount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Description</p>
                  <p>{selectedExpense.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p>{selectedExpense.category}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p>{new Date(selectedExpense.date).toISOString().slice(0, 10)}</p>
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
