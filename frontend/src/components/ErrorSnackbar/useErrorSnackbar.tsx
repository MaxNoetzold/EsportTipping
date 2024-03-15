import { useContext } from "react";
import SnackbarContext, { SnackbarContextType } from "./ErrorSnackbarContext";

export const useErrorSnackbar = () => {
  const { addMessage } = useContext<SnackbarContextType>(SnackbarContext);
  return addMessage;
};
