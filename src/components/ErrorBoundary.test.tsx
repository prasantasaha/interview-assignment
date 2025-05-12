import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children when there is no error", () => {
    const ChildComponent = () => <div>Child Component</div>;

    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });

  it("renders fallback UI when an error is thrown", () => {
    const ErrorThrowingComponent = () => {
      throw new Error("Test error");
    };

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong. Please try again later.")).toBeInTheDocument();
  });
});
