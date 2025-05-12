import { render, screen } from "../testUtil";
import UserMessage from "./UserMessage";
import { vi, describe, expect, it } from "vitest";

describe("UserMessage", () => {
  it("renders without crashing", () => {
    render(<UserMessage />, {});
  });

  it("displays the correct message", () => {
    const message = "Welcome to the bank!";
    render(<UserMessage />, { userMessageContextValue: { userMessage: { message }, setUserMessage: () => {} } });
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("updates the message when setMessage is called", () => {
    const setUserMessage = vi.fn();
    render(<UserMessage />, { userMessageContextValue: { userMessage: { message: "Initial message" }, setUserMessage } });
    expect(setUserMessage).not.toHaveBeenCalled();
  });
});
