import { render } from "../testUtil";
import type { Transaction } from "./BankContext";
import TransactionView from "./TransactionView";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("TransactionView", () => {
  it("renders without crashing", () => {
    render(<TransactionView view="deposit" setView={() => null} />, {});
  });

  it("renders the correct view based on the view prop", () => {
    const transactions: Transaction[] = [{ date: "2023-10-01", amount: 100, balance: 1150 }];
    const { getByText, getByLabelText, getByRole } = render(<TransactionView view="withdraw" setView={() => null} />, {
      bankContextValue: { transactions, balance: 1150, addTransaction: () => undefined },
    });

    expect(getByText(/Current Balance:\s*\$\s*1150\.00/i)).toBeInTheDocument();
    expect(getByLabelText(/please enter\s*amount to withdraw:/i)).toBeInTheDocument();
    expect(getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(getByRole("button", { name: /submit/i })).toBeDisabled();
    expect(getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it.skip("displays an error message for insufficient balance on withdrawal", async () => {
    const setMessageMock = vi.fn();
    const transactions: Transaction[] = [{ date: "2023-10-01", amount: 100, balance: 50 }];
    const { getByRole, getByLabelText } = render(<TransactionView view="withdraw" setView={() => null} />, {
      bankContextValue: { transactions, balance: 50, addTransaction: () => undefined },
      userMessageContextValue: { userMessage: { message: "" }, setUserMessage: setMessageMock },
    });

    const input = getByLabelText(/please enter\s*amount to withdraw:/i);
    await userEvent.type(input, "100");

    const submitButton = getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton, { delay: 500 });

    expect(setMessageMock).toHaveBeenCalledWith("Insufficient balance. You only have $50.00 available.");
  });

  it("navigates to menu on successful transaction", async () => {
    const setViewMock = vi.fn();
    const addTransactionMock = vi.fn(() => ({ date: "", amount: 200, balance: 1200 }) satisfies Transaction);
    const setMessageMock = vi.fn();
    const { getByRole, getByLabelText } = render(<TransactionView view="deposit" setView={setViewMock} />, {
      bankContextValue: { transactions: [], balance: 1000, addTransaction: addTransactionMock },
      userMessageContextValue: { userMessage: { message: "" }, setUserMessage: setMessageMock },
    });

    const input = getByLabelText(/please enter\s*amount to deposit:/i);
    await userEvent.type(input, "200");

    const submitButton = getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton, { delay: 500 });

    expect(addTransactionMock).toHaveBeenCalledWith(200, "deposit");
    expect(setMessageMock).toHaveBeenCalledWith({
      message: "Thank you. $200.00 has been deposited to your account.",
      severity: "success",
    });
    expect(setViewMock).toHaveBeenCalledWith("menu");
  });

  it("opens confirmation dialog when cancel is clicked with input", async () => {
    const { getByRole, getByLabelText, getByText } = render(<TransactionView view="deposit" setView={() => null} />, {});

    const input = getByLabelText(/please enter\s*amount to deposit:/i);
    await userEvent.type(input, "200");

    const cancelButton = getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelButton, { delay: 500 });

    expect(getByText(/are you sure you want to cancel this transaction\? any entered amount will be discarded/i)).toBeInTheDocument();
  });

  it("navigates to menu directly when cancel is clicked without input", async () => {
    const setViewMock = vi.fn();
    const { getByRole } = render(<TransactionView view="deposit" setView={setViewMock} />, {});

    const cancelButton = getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelButton, { delay: 500 });

    expect(setViewMock).toHaveBeenCalledWith("menu");
  });
});
