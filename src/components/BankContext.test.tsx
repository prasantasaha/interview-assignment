import { describe, it, expect } from "vitest";
import { renderHook, act } from "../testUtil";
import { BankProvider, formatDate, useBankContext } from "./BankContext";
import type { TransactionViewType } from "../types";

describe("BankContext", () => {
  it("provides default values when no initial value is provided", () => {
    const { result } = renderHook(() => useBankContext(), {
      wrapper: ({ children }) => <BankProvider>{children}</BankProvider>,
    });

    expect(result.current.balance).toBe(0);
    expect(result.current.transactions).toEqual([]);
  });

  it("uses provided initial values", () => {
    const initialValue = {
      balance: 100,
      transactions: [{ date: "2023-01-01", amount: 100, balance: 100 }],
      addTransaction: () => undefined,
    };

    const { result } = renderHook(() => useBankContext(), {
      wrapper: ({ children }) => <BankProvider value={initialValue}>{children}</BankProvider>,
    });

    expect(result.current.balance).toBe(100);
    expect(result.current.transactions).toEqual(initialValue.transactions);
  });

  it("adds a deposit transaction and updates balance", () => {
    const { result } = renderHook(() => useBankContext(), {
      wrapper: ({ children }) => <BankProvider>{children}</BankProvider>,
    });

    act(() => {
      result.current.addTransaction(50, "deposit" as TransactionViewType);
    });

    expect(result.current.balance).toBe(50);
    expect(result.current.transactions).toHaveLength(1);
    expect(result.current.transactions[0].amount).toBe(50);
    expect(result.current.transactions[0].balance).toBe(50);
  });

  it("adds a withdrawal transaction and updates balance", async () => {
    const { result } = renderHook(() => useBankContext(), {
      wrapper: ({ children }) => <BankProvider>{children}</BankProvider>,
    });

    act(() => {
      result.current.addTransaction(20, "withdraw");
    });

    expect(result.current.balance).toBe(-20);
    expect(result.current.transactions).toHaveLength(1);
    expect(result.current.transactions[0].amount).toBe(-20);
    expect(result.current.transactions[0].balance).toBe(-20);
  });

  it("does not add a transaction with invalid amount", () => {
    const { result } = renderHook(() => useBankContext(), {
      wrapper: ({ children }) => <BankProvider>{children}</BankProvider>,
    });

    act(() => {
      result.current.addTransaction(0, "deposit" as TransactionViewType);
      result.current.addTransaction(-10, "withdraw" as TransactionViewType);
    });

    expect(result.current.balance).toBe(0);
    expect(result.current.transactions).toHaveLength(0);
  });

  it("throws an error when useBankContext is used outside BankProvider", () => {
    const { result } = renderHook(() => {
      try {
        return useBankContext();
      } catch (error) {
        return error;
      }
    });

    expect(result.current).toBeInstanceOf(Error);
    expect((result.current as Error).message).toBe("useBank must be used within BankProvider");
  });

  describe("formatDate", () => {
    it("formats a date correctly in", () => {
      const date = new Date("2023-01-01T15:30:45");
      const formattedDate = formatDate(date);
      expect(formattedDate).toBe("1 Jan 2023 03:30:45PM");
    });
  });
});
