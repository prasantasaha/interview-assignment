import userEvent from "@testing-library/user-event";
import { render } from "../testUtil";
import QuitView from "./QuitView";
import { describe, expect, it, vi } from "vitest";

describe("QuitView", () => {
  it("renders without crashing", () => {
    render(<QuitView setView={() => null} />, {});
  });

  it("displays the correct message", () => {
    const { getByText } = render(<QuitView setView={() => null} />, {
      userMessageContextValue: { message: "Thank you for banking with AwesomeGIC Bank.\nHave a nice day!", setMessage: () => {} },
    });
    getByText(/thank you for banking/i);
  });
  it("renders the Back to Home button", () => {
    const { getByText } = render(<QuitView setView={() => null} />, {});
    getByText(/back to home/i);
  });

  it("calls setView when the Back to home is clicked", async () => {
    const setViewMock = vi.fn();
    const { getByText } = render(<QuitView setView={setViewMock} />, {});
    await userEvent.click(getByText(/back to home/i));
    expect(setViewMock).toHaveBeenCalledWith("menu");
  });
});
