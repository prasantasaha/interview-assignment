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

  it("calls setView when the Back to home is clicked", () => {
    const setViewMock = vi.fn();
    const { getByText } = render(<QuitView setView={setViewMock} />, {});
    getByText(/back to home/i).click();
    expect(setViewMock).toHaveBeenCalledWith("menu");
  });
});
