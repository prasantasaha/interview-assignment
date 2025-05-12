import { render, screen, act } from "../testUtil";
import userEvent from "@testing-library/user-event";
import ConfirmationDialog from "./ConfirmationDialog";
import { describe, it, expect, vi } from "vitest";

describe("ConfirmationDialog", () => {
  it("renders the dialog with the correct message", async () => {
    await act(async () => {
      render(
        <ConfirmationDialog open={true} onClose={() => {}} onConfirm={() => {}} title="Confirm Action" message="Are you sure you want to proceed?" />,
        {}
      );
    });

    expect(screen.getByText("Confirm Action")).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to proceed?")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
  });

  it("does not render the dialog when open is false", () => {
    render(
      <ConfirmationDialog open={false} onClose={() => {}} onConfirm={() => {}} title="Confirm Action" message="Are you sure you want to proceed?" />,
      {}
    );

    expect(screen.queryByText("Confirm Action")).not.toBeInTheDocument();
  });

  it("calls onClose when the No button is clicked", async () => {
    const onCloseMock = vi.fn();
    render(
      <ConfirmationDialog
        open={true}
        onClose={onCloseMock}
        onConfirm={() => {}}
        title="Confirm Action"
        message="Are you sure you want to proceed?"
      />,
      {}
    );

    await userEvent.click(screen.getByText("No"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("calls onConfirm when the Yes button is clicked", async () => {
    const onConfirmMock = vi.fn();
    render(
      <ConfirmationDialog
        open={true}
        onClose={() => {}}
        onConfirm={onConfirmMock}
        title="Confirm Action"
        message="Are you sure you want to proceed?"
      />,
      {}
    );

    await userEvent.click(screen.getByText("Yes"));
    expect(onConfirmMock).toHaveBeenCalled();
  });
});
