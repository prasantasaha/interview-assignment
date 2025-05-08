import { render } from "../testUtil";
import TransactionView from "./TransactionView";
import { describe, it } from "vitest";

describe("TransactionView", () => {
  it("renders without crashing", () => {
    render(<TransactionView view="deposit" setView={() => null} />, {});
  });
});
