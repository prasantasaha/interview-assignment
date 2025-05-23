// Define a union type for different types of views
export const views = ["menu", "deposit", "withdraw", "statement", "quit"] as const;
export type ViewType = (typeof views)[number];
export type TransactionViewType = Extract<ViewType, "deposit" | "withdraw">;

export type ViewComponent = {
  setView: (v: ViewType) => void;
};
export type TransactionComponent = ViewComponent & {
  view: TransactionViewType;
};
