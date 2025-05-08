import { render } from "../testUtil";
import UserMessage from "./UserMessage";
import { describe, it } from "vitest";

describe("UserMessage", () => {
  it("renders without crashing", () => {
    render(<UserMessage />, {});
  });
});
