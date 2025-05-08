import { render } from "../testUtil";
import QuitView from "./QuitView";
import { describe, it } from "vitest";

describe("QuitView", () => {
  it("renders without crashing", () => {
    render(<QuitView setView={() => null} />, {});
  });
});
