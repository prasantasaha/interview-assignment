import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("wraps content with all the providers", () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it("renders the welcome message", () => {
    render(<App />);
    expect(screen.getByText(/Welcome to AwesomeGIC Bank!/i)).toBeInTheDocument();
  });

  it("renders the menu view by default", () => {
    render(<App />);
    // MenuView should render some menu options/buttons
    expect(screen.getByRole("button", { name: /deposit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /withdraw/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /statement/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /quit/i })).toBeInTheDocument();
  });

  it("renders the main containerr", () => {
    render(<App />);
    expect(screen.getByText(/Welcome to AwesomeGIC Bank!/i).closest("div")).toBeInTheDocument();
  });
});
