import React, { createContext, useContext, useState, type ReactNode } from "react";

export type UserMessageContextType = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const UserMessageContext = createContext<UserMessageContextType | undefined>(undefined);

export const UserMessageProvider = ({ children, value }: { children: ReactNode; value?: UserMessageContextType }) => {
  const [message, setMessage] = useState(value?.message || "");
  return <UserMessageContext.Provider value={{ message, setMessage: value?.setMessage ?? setMessage }}>{children}</UserMessageContext.Provider>;
};

export const useUserMessage = () => {
  const context = useContext(UserMessageContext);
  if (!context) throw new Error("useUserMessage must be used within UserMessageProvider");
  return context;
};
