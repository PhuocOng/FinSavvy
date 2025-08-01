import React, { useState } from 'react';
import axios from 'axios';
import AmountEntry from './AmountEntry';
import ExpenseForm from './ExpenseForm';
import ConfirmExpense from './ConfirmExpense';

const AddExpenseForm = ({ onAdd, categoryOptions, onClose }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [confirmed, setConfirmed] = useState(false);
  const handleEdit = (field) => {
  if (field === 'amount') setStep(1);
  else if (field === 'name' || field === 'category' || field === 'date') setStep(2);
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/transactions/manual-expenses`,
        { name, amount, category, date: date.toISOString().slice(0, 10) },
        { withCredentials: true }
      );

      onAdd(res.data);
      setAmount('');
      setName('');
      setCategory('');
      setDate(new Date());
      setStep(1);
      setConfirmed(true);
    } catch (err) {
      console.error('Error adding manual expense:', err);
    }
  };

  return (
      <form onSubmit={handleSubmit} className="add-expense-form">
    {confirmed && (
      <div className="text-green-600 font-medium">✅ Expense added successfully!</div>
    )}

    <div className="add-expense-panel show">
      {step === 1 && (
        <AmountEntry 
        amount={amount} 
        setAmount={setAmount} 
        onNext={() => setStep(2)}
        onBack={onClose} />
      )}

      {step === 2 && (
        <ExpenseForm
          name={name}
          setName={setName}
          category={category}
          setCategory={setCategory}
          date={date}
          setDate={setDate}
          categoryOptions={categoryOptions}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <ConfirmExpense
          name={name}
          setName={setName}
          amount={amount}
          setAmount={setAmount}
          category={category}
          setCategory={setCategory}
          date={date}
          setDate={setDate}
          onBack={() => setStep(2)}
          onSubmit={handleSubmit}
          onEdit={handleEdit}
        />
      )}
    </div>
  </form>

  );
};

export default AddExpenseForm;
