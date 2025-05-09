import { describe, it, vi, expect } from "vitest";
import MenuView from "./MenuView";
import { render } from "../testUtil";

describe("MenuView", () => {
  it("renders without crashing", () => {
    render(<MenuView setView={() => null} />, {});
  });

  it("renders all menu items", () => {
    const { getByRole } = render(<MenuView setView={() => null} />, {});
    expect(getByRole("button", { name: /deposit/i })).toBeInTheDocument();
    expect(getByRole("button", { name: /withdraw/i })).toBeInTheDocument();
    expect(getByRole("button", { name: /statement/i })).toBeInTheDocument();
    expect(getByRole("button", { name: /quit/i })).toBeInTheDocument();
  });

  it("calls setView when a menu item is clicked", () => {
    const setViewMock = vi.fn();
    const { getByRole } = render(<MenuView setView={setViewMock} />, {});
    getByRole("button", { name: /withdraw/i }).click();
    expect(setViewMock).toHaveBeenCalledWith("withdraw");
  });
});
