import { ModalProvider } from "contexts/ModalContext";
import { ToastProvider } from "contexts/ToastContext";
import React, { useState, useEffect } from "react";
import { RootState } from "@redux/config/store";
import { LoginBar } from "@components/index";
import { useSelector } from "react-redux";
import AppRoutes from "routes";

function App() {
  const reduxUser = useSelector((state: RootState) => state.user);

  const [isAuthenticated, setAuthenticated] = useState(
    reduxUser.isAuthenticated
  );

  useEffect(() => {
    setAuthenticated(reduxUser.isAuthenticated);
  }, [reduxUser]);

  return (
    <div>
      <ToastProvider>
        <ModalProvider>
          <AppRoutes isAuthenticated={isAuthenticated} />
          {!isAuthenticated && <LoginBar />}
        </ModalProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
