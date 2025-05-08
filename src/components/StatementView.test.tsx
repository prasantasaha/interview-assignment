import { render } from "../testUtil";
import StatementView from "./StatementView";
import { describe, it } from "vitest";

describe("StatementView", () => {
  it("renders without crashing", () => {
    render(<StatementView setView={() => null} />, {});
  });
});
