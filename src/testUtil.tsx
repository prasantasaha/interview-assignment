import { render, type RenderOptions } from "@testing-library/react";

import { BankProvider } from "./components/BankContext";
import { UserMessageProvider } from "./components/UserMessageContext";
import type { ReactElement, ReactNode } from "react";

const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <BankProvider>
      <UserMessageProvider>{children}</UserMessageProvider>
    </BankProvider>
  );
};

const customRender = (ui: ReactElement, options: RenderOptions) =>
  render(ui, {
    wrapper: ({ children }) => (
      <AllProviders {...options}>{children}</AllProviders>
    ),
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
