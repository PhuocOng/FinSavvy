import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./AddExpense.css";
import { CornerDownLeft } from "lucide-react";

const AmountEntry = ({ amount, setAmount, onNext, onBack, theme }) => {
  const handleClick = (val) => {
    if (val === "←") {
      setAmount((prev) => prev.slice(0, -1));
    } else if (!(val === "." && amount.includes("."))) {
      setAmount((prev) => prev + val);
    }
  };

  return (
    <div className={`amount-entry-container ${theme || ""}`}>
      {/* Header with Back */}
      <div className="amount-entry-header">
        <button onClick={onBack} className="back-button">
          <CornerDownLeft />
        </button>
        <h2 className="amount-entry-header-title">Create Expense</h2>
      </div>

      {/* Amount Display */}
      <div className="amount-entry-display">
        <p className="amount-entry-title">Amount</p>
        <div className="amount-entry-value">${amount || "0"}</div>
      </div>

      {/* Keypad */}
      <div className="amount-entry-keypad">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "←"].map(
          (val) => (
            <button
              key={val}
              type="button"
              onClick={() => handleClick(val)}
              className="amount-entry-button"
            >
              {val}
            </button>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={onNext}
        disabled={!amount}
        className={`amount-entry-next mb-20 ${
          amount ? "amount-entry-next-enabled" : "amount-entry-next-disabled"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default AmountEntry;
