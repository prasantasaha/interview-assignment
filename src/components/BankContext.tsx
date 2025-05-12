import { createContext, useContext, useState, type ReactNode } from "react";
import type { TransactionViewType } from "../constants";

export type Transaction = {
  date: string;
  amount: number;
  balance: number;
};

export type BankContextType = {
  balance: number;
  transactions: Transaction[];
  addTransaction: (amount: number, type: TransactionViewType) => Transaction | undefined;
};

const BankContext = createContext<BankContextType | undefined>(undefined);

export const formatDate = (date: Date) => {
  return date
    .toLocaleString("en-SG", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    .replace(",", "");
};

export const BankProvider = ({ children, value }: { children: ReactNode; value?: BankContextType }) => {
  const [balance, setBalance] = useState(value?.balance || 0);
  const [transactions, setTransactions] = useState<Transaction[]>(value?.transactions ?? []);

  const addTransaction = (amount: number, type: TransactionViewType) => {
    if (!amount || amount <= 0) return;

    const newBalance = type === "deposit" ? balance + amount : balance - amount;
    const transaction: Transaction = {
      date: formatDate(new Date()),
      amount: type === "deposit" ? amount : -amount,
      balance: newBalance,
    };

    setBalance(newBalance);
    setTransactions((prev) => [...prev, transaction]);
    return transaction;
  };

  return <BankContext.Provider value={value || { balance, transactions, addTransaction }}>{children}</BankContext.Provider>;
};

export const useBankContext = () => {
  const context = useContext(BankContext);
  if (!context) throw new Error("useBank must be used within BankProvider");
  return context;
};
