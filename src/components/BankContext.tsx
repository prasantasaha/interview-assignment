import { createContext, useContext, useState, type ReactNode } from "react";
import type { TransactionViewType } from "../constants";

interface Transaction {
  date: string;
  amount: number;
  balance: number;
}

interface BankContextType {
  balance: number;
  transactions: Transaction[];
  addTransaction: (
    amount: number,
    type: TransactionViewType,
  ) => Transaction | undefined;
}

const BankContext = createContext<BankContextType | undefined>(undefined);

export const BankProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (amount: number, type: TransactionViewType) => {
    if (!amount || amount <= 0) return;

    const newBalance = type === "deposit" ? balance + amount : balance - amount;
    const transaction: Transaction = {
      date: new Date().toLocaleString(),
      amount: type === "deposit" ? amount : -amount,
      balance: newBalance,
    };

    setBalance(newBalance);
    setTransactions((prev) => [...prev, transaction]);
    return transaction;
  };

  return (
    <BankContext.Provider value={{ balance, transactions, addTransaction }}>
      {children}
    </BankContext.Provider>
  );
};

export const useBankContext = () => {
  const context = useContext(BankContext);
  if (!context) throw new Error("useBank must be used within BankProvider");
  return context;
};
