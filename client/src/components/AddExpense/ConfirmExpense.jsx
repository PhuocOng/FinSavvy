import React from 'react';
import { FaArrowLeft, FaChevronRight } from 'react-icons/fa';

const ConfirmExpense = ({
  name,
  amount,
  category,
  date,
  onBack,
  onSubmit,
  onEdit,
}) => {
  return (
    <div className="bg-white w-full max-w-sm mx-auto h-full flex flex-col justify-between p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-gray-600 hover:text-black text-xl">
          <FaArrowLeft />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">Confirm details</h2>
      </div>

      {/* Detail Items */}
      <div className="space-y-6 flex-1 overflow-y-auto">
        {/* Amount */}
        <div
          onClick={() => onEdit('amount')}
          className="flex justify-between items-center cursor-pointer border-b pb-4"
        >
          <div>
            <div className="text-sm text-gray-500">Amount</div>
            <div className="text-base font-medium">${amount}</div>
          </div>
          <FaChevronRight className="text-gray-400" />
        </div>

        {/* Name */}
        <div
          onClick={() => onEdit('name')}
          className="flex justify-between items-center cursor-pointer border-b pb-4"
        >
          <div>
            <div className="text-sm text-gray-500">Description</div>
            <div className="text-base font-medium">{name || '—'}</div>
          </div>
          <FaChevronRight className="text-gray-400" />
        </div>

        {/* Category */}
        <div
          onClick={() => onEdit('category')}
          className="flex justify-between items-center cursor-pointer border-b pb-4"
        >
          <div>
            <div className="text-sm text-gray-500">Category</div>
            <div className="text-base font-medium">{category || '—'}</div>
          </div>
          <FaChevronRight className="text-gray-400" />
        </div>

        {/* Date */}
        <div
          onClick={() => onEdit('date')}
          className="flex justify-between items-center cursor-pointer border-b pb-4"
        >
          <div>
            <div className="text-sm text-gray-500">Date</div>
            <div className="text-base font-medium">
              {date?.toISOString().slice(0, 10)}
            </div>
          </div>
          <FaChevronRight className="text-gray-400" />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        onClick={onSubmit}
        className="mt-6 w-full bg-blue-50 hover: bg-blue-100 text-white py-3 rounded-full font-semibold text-base"
      >
        Create ${amount} expense
      </button>
    </div>
  );
};

export default ConfirmExpense;
