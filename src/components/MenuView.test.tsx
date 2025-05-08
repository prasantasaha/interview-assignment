import { describe, it } from "vitest";
import MenuView from "./MenuView";
import { render } from "../testUtil";

describe("MenuView", () => {
  it("renders without crashing", () => {
    render(<MenuView setView={() => null} />, {});
  });
});
