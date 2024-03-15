import { createContext } from "react";

export interface SnackbarContextType {
  messages: string[];
  addMessage: (message: string) => void;
  updateMessages: (fn: (draft: string[]) => void) => void;
}

const SnackbarContext = createContext<SnackbarContextType>({
  messages: [],
  addMessage: () => {},
  updateMessages: () => {},
});

export default SnackbarContext;
