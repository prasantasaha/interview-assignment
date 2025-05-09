import { render, screen } from "../testUtil";
import UserMessage from "./UserMessage";
import { vi, describe, expect, it } from "vitest";

describe("UserMessage", () => {
  it("renders without crashing", () => {
    render(<UserMessage />, {});
  });

  it("displays the correct message", () => {
    const message = "Welcome to the bank!";
    render(<UserMessage />, { userMessageContextValue: { message, setMessage: () => {} } });
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("updates the message when setMessage is called", () => {
    const setMessage = vi.fn();
    render(<UserMessage />, { userMessageContextValue: { message: "Initial message", setMessage } });
    expect(setMessage).not.toHaveBeenCalled();
  });
});
