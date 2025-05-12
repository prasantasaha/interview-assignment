import { createContext, useContext, useState, type ReactNode } from "react";
import { type AlertProps } from "@mui/material";

type SeverityType = AlertProps["severity"];

export type UserMessageState = {
  message: string;
  severity?: SeverityType;
};

export type UserMessageContextType = {
  userMessage: UserMessageState;
  setUserMessage: (newMessage: UserMessageState) => void;
};

const UserMessageContext = createContext<UserMessageContextType | undefined>(undefined);

export const UserMessageProvider = ({ children, value }: { children: ReactNode; value?: UserMessageContextType }) => {
  const defaultValue = value ?? {
    userMessage: { message: "", severity: "info" },
  };

  const [userMessage, setUserMessage] = useState<UserMessageState>(defaultValue.userMessage);

  return (
    <UserMessageContext.Provider value={{ userMessage, setUserMessage: value?.setUserMessage ?? setUserMessage }}>
      {children}
    </UserMessageContext.Provider>
  );
};

export const useUserMessage = () => {
  const context = useContext(UserMessageContext);
  if (!context) throw new Error("useUserMessage must be used within UserMessageProvider");
  return context;
};
