import { describe, it, expect } from "vitest";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

describe("main.tsx", () => {
  it("renders the App component without crashing", () => {
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);

    expect(() => {
      createRoot(root).render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    }).not.toThrow();
  });

  it("should have a root element in the document", () => {
    const root = document.getElementById("root");
    expect(root).not.toBeNull();
  });
});
