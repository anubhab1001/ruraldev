import { useState } from "react";
import { analyzeExpenses } from "../../constant/aiModel"; // Adjust the import path as necessary
import Suggestions from "./Suggestions";

const FinanceCalculator = () => {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [expenseDetails, setExpenseDetails] = useState("");
  const [balance, setBalance] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const calculateBalance = () => {
    const netBalance = parseFloat(income) - parseFloat(expenses);
    setBalance(netBalance);

    if (netBalance < 0) {
      setSuggestions(analyzeExpenses(expenseDetails));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Finance Calculator</h2>
      <input className="w-full p-2 my-2 border rounded" type="number" placeholder="Total Income" onChange={(e) => setIncome(e.target.value)} />
      <input className="w-full p-2 my-2 border rounded" type="number" placeholder="Total Expenses" onChange={(e) => setExpenses(e.target.value)} />
      <textarea className="w-full p-2 my-2 border rounded" placeholder="Expense Details (Food, Rent, Travel, etc.)" onChange={(e) => setExpenseDetails(e.target.value)}></textarea>
      <button className="w-full bg-green-700 text-white p-2 rounded mt-2 hover:bg-green-800" onClick={calculateBalance}>Calculate</button>
      
      {balance !== null && (
        <div className={`mt-4 p-3 text-lg font-bold ${balance < 0 ? "text-red-600" : "text-green-600"}`}>
          Net Balance: ₹{balance}
        </div>
      )}

      {balance < 0 && <Suggestions suggestions={suggestions} />}
    </div>
  );
};

export default FinanceCalculator;
