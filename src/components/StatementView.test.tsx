import { render } from "../testUtil";
import type { Transaction } from "./BankContext";
import StatementView from "./StatementView";
import { describe, expect, it, vi } from "vitest";

describe("StatementView", () => {
  it("renders without crashing", () => {
    render(<StatementView setView={() => null} />, {});
  });

  it("renders a list of transactions", () => {
    const transactions: Transaction[] = [{ date: "2023-10-01", amount: 100, balance: 1000 }];
    const { getByText } = render(<StatementView setView={() => null} />, {
      bankContextValue: { transactions, balance: 1150, addTransaction: () => undefined },
    });
    expect(getByText("2023-10-01")).toBeInTheDocument();
    expect(getByText("100.00")).toBeInTheDocument();
    expect(getByText("1000.00")).toBeInTheDocument();
    expect(getByText("Back to Menu")).toBeInTheDocument();
  });

  it("renders a message when there are no transactions", () => {
    const { getByText } = render(<StatementView setView={() => null} />, {
      bankContextValue: { transactions: [], balance: 0, addTransaction: () => undefined },
    });
    expect(getByText("No records found.")).toBeInTheDocument();
    expect(getByText("Back to Menu")).toBeInTheDocument();
  });

  it("calls setView when the Back to Menu button is clicked", () => {
    const setViewMock = vi.fn();
    const { getByText } = render(<StatementView setView={setViewMock} />, {});
    getByText(/back to menu/i).click();
    expect(setViewMock).toHaveBeenCalledWith("menu");
  });
});
