import { useImmer } from "use-immer";
import Snackbar from "./ErrorSnackbar";
import SnackbarContext from "./ErrorSnackbarContext";
import { ReactNode, useCallback } from "react";

interface SnackbarProviderProps {
  children: ReactNode;
}

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [messages, updateMessages] = useImmer<string[]>([]);

  const addMessage = useCallback(
    (message: string) => {
      updateMessages((draft) => {
        draft.push(message);
      });
    },
    [updateMessages]
  );

  return (
    <SnackbarContext.Provider value={{ messages, addMessage, updateMessages }}>
      {children}
      {messages.length > 0 && <Snackbar />}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
