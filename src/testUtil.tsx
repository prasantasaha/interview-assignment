import { render, type RenderOptions } from "@testing-library/react";

import { BankProvider, type BankContextType } from "./components/BankContext";
import { UserMessageProvider, type UserMessageContextType } from "./components/UserMessageContext";
import type { ReactElement, ReactNode } from "react";

const AllProviders = ({
  children,
  bankContextValue,
  userMessageContextValue,
}: {
  children: ReactNode;
  bankContextValue?: BankContextType;
  userMessageContextValue?: UserMessageContextType;
}) => {
  return (
    <BankProvider value={bankContextValue}>
      <UserMessageProvider value={userMessageContextValue}>{children}</UserMessageProvider>
    </BankProvider>
  );
};

type customRenderOptions = {
  bankContextValue?: BankContextType;
  userMessageContextValue?: UserMessageContextType;
} & RenderOptions;

const customRender = (ui: ReactElement, options: customRenderOptions) =>
  render(ui, {
    wrapper: ({ children }) => <AllProviders {...options}>{children}</AllProviders>,
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
