import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const AmountEntry = ({ amount, setAmount, onNext, onBack }) => {
  const handleClick = (val) => {
    if (val === '←') {
      setAmount((prev) => prev.slice(0, -1));
    } else if (!(val === '.' && amount.includes('.'))) {
      setAmount((prev) => prev + val);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full p-6 bg-white w-full max-w-sm mx-auto">
      {/* Header with Back */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="text-xl text-gray-700 hover:text-black ">
          <FaArrowLeft />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">Create Expense</h2>
      </div>

      {/* Amount Display */}
      <div className="text-center mb-8">
        <p className="text-sm text-gray-500 font-medium mb-1">Amount</p>
        <div className="text-5xl font-bold text-gray-900">${amount || '0'}</div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-4 w-full mx-auto mb-8">
        {['1','2','3','4','5','6','7','8','9','.','0','←'].map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => handleClick(val)}
            className="py-3 bg-gray-100 text-lg font-semibold rounded-full shadow-sm hover:bg-gray-200 active:scale-95 transition"
          >
            {val}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={onNext}
        disabled={!amount}
        className={`w-full py-3 rounded-full text-white text-lg font-semibold transition ${
          amount ? 'bg-blue-50 hover: bg-blue-100 ': 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default AmountEntry;
