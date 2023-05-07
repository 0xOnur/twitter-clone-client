import React, { createContext, useState, useCallback } from "react";
import Toast from "@components/Toast";

// Define the shape of the Toast object
interface ToastState {
  message: string;
  type: "success" | "error" | "info";
}

// Define the shape of the function that will be used to display the Toast
type ShowToast = (message: string, type: "success" | "error" | "info") => void;

// Define the shape of the context object that will be used to pass the Toast display function down the component tree
interface ToastContextProps {
  showToast: ShowToast;
}

// Create the Toast context object
export const ToastContext = createContext<ToastContextProps>({
  showToast: () => {},
});

// Define the props that the ToastProvider component will receive
interface ToastProviderProps {
  children: React.ReactNode;
}

// Create the ToastProvider component
export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<ToastState | null>(null);

  // Create the function that will be used to display the Toast
  const showToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info') => {
      // If a Toast is currently being displayed, remove it first
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    },
    []
  );

  return (
    // Pass the showToast function down the component tree using the ToastContext object
    <ToastContext.Provider value={{ showToast }}>
      {toast && <Toast message={toast.message} type={toast.type} />}
      {children}
    </ToastContext.Provider>
  );
};
