import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// Message Context
interface UserMessageContextType {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const UserMessageContext = createContext<UserMessageContextType | undefined>(
  undefined,
);

export const UserMessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");
  return (
    <UserMessageContext.Provider value={{ message, setMessage }}>
      {children}
    </UserMessageContext.Provider>
  );
};

export const useUserMessage = () => {
  const context = useContext(UserMessageContext);
  if (!context)
    throw new Error("useUserMessage must be used within UserMessageProvider");
  return context;
};
