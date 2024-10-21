import React, { useState, useRef } from 'react';
import './Ledger.css';

interface Transaction {
  type: string;
  amount: number;
  date: string;
  time: string;
}

interface LedgerProps {
  transactions: Transaction[];
  addTransaction: (type: string, amount: number, date: string, time: string) => void;
}

const Ledger: React.FC<LedgerProps> = ({ transactions, addTransaction }) => {
  const [amount, setAmount] = useState<string>('');
  const [transactionType, setTransactionType] = useState<string>('debit');
  const totalDebitedRef = useRef<number>(0);
  const totalCreditedRef = useRef<number>(0);

  const handleTransaction = () => {
    if (amount) {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();

      addTransaction(transactionType, Number(amount), date, time);
      if (transactionType === 'debit') {
        totalDebitedRef.current += Number(amount);
      } else {
        totalCreditedRef.current += Number(amount);
      }
      setAmount('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTransaction();
    }
  };

  const balance = totalCreditedRef.current - totalDebitedRef.current;

  return (
    <div className="container">
      <h2>Transactions</h2>
      <div className="input-group">
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Amount"
        />
        <select onChange={e => setTransactionType(e.target.value)} value={transactionType}>
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select>
        <button onClick={handleTransaction}>Add Transaction</button>
      </div>

      <h3>Total Debited: {totalDebitedRef.current}</h3>
      <h3>Total Credited: {totalCreditedRef.current}</h3>
      <h3>Balance: {balance}</h3>

      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.date}</td>
              <td>{transaction.time}</td>
              <td>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
              <td>₹{transaction.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ledger;
