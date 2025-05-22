import userEvent from "@testing-library/user-event";
import { render } from "../testUtil";
import type { Transaction } from "./BankContext";
import StatementView from "./StatementView";
import { describe, expect, it, vi } from "vitest";

describe("StatementView", () => {
  it("renders without crashing", () => {
    render(<StatementView setView={() => null} />, {});
  });

  it("renders a list of transactions", () => {
    const transactions: Transaction[] = [{ date: "2023-10-01", amount: 1000, balance: 1000 }];
    const { getByText, getByTestId } = render(<StatementView setView={() => null} />, {
      bankContextValue: { transactions, balance: 1150, addTransaction: () => undefined },
    });
    expect(getByText("2023-10-01")).toBeInTheDocument();
    // expect(getByText("2,000.00")).toBeInTheDocument();
    // expect(getByText("1,000.00")).toBeInTheDocument();
    expect(getByTestId("transaction-amount-0")).toHaveTextContent("1,000.00");
    expect(getByTestId("transaction-balance-0")).toHaveTextContent("1,000.00");
    expect(getByText("Back to Menu")).toBeInTheDocument();
  });

  it("renders a message when there are no transactions", () => {
    const { getByText } = render(<StatementView setView={() => null} />, {
      bankContextValue: { transactions: [], balance: 0, addTransaction: () => undefined },
    });
    expect(getByText("No records found.")).toBeInTheDocument();
    expect(getByText("Back to Menu")).toBeInTheDocument();
  });

  it("calls setView when the Back to Menu button is clicked", async () => {
    const setViewMock = vi.fn();
    const { getByText } = render(<StatementView setView={setViewMock} />, {});

    await userEvent.click(getByText(/back to menu/i));
    expect(setViewMock).toHaveBeenCalledWith("menu");
  });
});
