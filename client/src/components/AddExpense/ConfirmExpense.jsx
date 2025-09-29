import React from "react";
import { FaArrowLeft, FaChevronRight } from "react-icons/fa";
import "./AddExpense.css";
import { CornerDownLeft } from "lucide-react";

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
    <div className="confirm-expense-container full-height-centered">
      {/* Header */}
      <div className="confirm-expense-header">
        <button onClick={onBack} className="back-button">
          <CornerDownLeft />
        </button>
        <h2 className="confirm-expense-title">Confirm details</h2>
      </div>

      {/* Main Content */}
      <div className="confirm-expense-details">
        <div onClick={() => onEdit("amount")} className="confirm-expense-item">
          <div>
            <div className="confirm-expense-label">Amount</div>
            <div className="confirm-expense-value">${amount}</div>
          </div>
          <FaChevronRight className="chevron-icon" />
        </div>

        <div onClick={() => onEdit("name")} className="confirm-expense-item">
          <div>
            <div className="confirm-expense-label">Description</div>
            <div className="confirm-expense-value">{name || "—"}</div>
          </div>
          <FaChevronRight className="chevron-icon" />
        </div>

        <div
          onClick={() => onEdit("category")}
          className="confirm-expense-item"
        >
          <div>
            <div className="confirm-expense-label">Category</div>
            <div className="confirm-expense-value">{category || "—"}</div>
          </div>
          <FaChevronRight className="chevron-icon" />
        </div>

        <div onClick={() => onEdit("date")} className="confirm-expense-item">
          <div>
            <div className="confirm-expense-label">Date</div>
            <div className="confirm-expense-value">
              {date
                ? new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "—"}
            </div>
          </div>
          <FaChevronRight className="chevron-icon" />
        </div>
      </div>

      {/* Footer */}
      <div className="confirm-expense-footer mb-20">
        <button
          type="submit"
          onClick={onSubmit}
          className="confirm-expense-submit"
        >
          Create ${amount} expense
        </button>
      </div>
    </div>
  );
};

export default ConfirmExpense;
