import { render } from "../testUtil";
import type { Transaction } from "./BankContext";
import TransactionView from "./TransactionView";
import { describe, expect, it } from "vitest";

describe("TransactionView", () => {
  it("renders without crashing", () => {
    render(<TransactionView view="deposit" setView={() => null} />, {});
  });

  it("renders the correct view based on the view prop", () => {
    const transactions: Transaction[] = [{ date: "2023-10-01", amount: 100, balance: 1000 }];
    const { getByText, getByRole } = render(<TransactionView view="withdraw" setView={() => null} />, {
      bankContextValue: { transactions, balance: 1150, addTransaction: () => undefined },
    });
    // expect(getByText("/current balance: $1000.00/i")).toBeInTheDocument();
    expect(getByRole("label", { name: /please enter amount to/i })).toBeInTheDocument();
    expect(getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(getByRole("button", { name: /submit/i })).toBeDisabled();
    expect(getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });
});
