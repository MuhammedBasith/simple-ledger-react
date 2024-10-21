import React, { useState } from 'react';
import Ledger from './components/Ledger';

interface Transaction {
  type: string;
  amount: number;
  date: string;
  time: string;
}

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (type: string, amount: number, date: string, time: string) => {
    const newTransaction: Transaction = { type, amount, date, time };
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <div>
      <h1>Balance Sheet Ledger</h1>
      <Ledger transactions={transactions} addTransaction={addTransaction} />
    </div>
  );
};

export default App;
