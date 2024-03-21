import { useState, useContext, useEffect } from "react";
import SnackbarContext from "./ErrorSnackbarContext";

const ErrorSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("Snackbar must be used within a SnackbarProvider");
  }

  const { messages, updateMessages } = context;

  const [currentMessage, setCurrentMessage] = useState<string | undefined>();

  // when the messages array changes, it means a new message has been added
  // we want to display it for 3 seconds, then remove it
  // if a new message is added while the current message is being displayed, it should be shown after the current message is removed
  useEffect(() => {
    if (messages.length > 0 && !currentMessage) {
      setCurrentMessage(messages[0]);
      setTimeout(() => {
        updateMessages((draft) => {
          draft.shift();
        });
        setCurrentMessage(undefined);
      }, 3000);
    }
  }, [currentMessage, messages, updateMessages]);

  if (!currentMessage) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 bg-red-500 text-white p-4 m-4 rounded z-50">
      {currentMessage}
    </div>
  );
};

export default ErrorSnackbar;
