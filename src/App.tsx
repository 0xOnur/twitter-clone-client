import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@redux/config/store";
import { LoginBar} from "@components/index";
import { ToastProvider } from "contexts/ToastContext";
import AppRoutes from "routes";
import { useAuth } from "@hooks/useAuth";

function App() {
  const reduxUser = useSelector((state: RootState) => state.user);
  useAuth();

  const [isAuthenticated, setAuthenticated] = useState(
    reduxUser.isAuthenticated
  );

  useEffect(() => {
    setAuthenticated(reduxUser.isAuthenticated);
  }, [reduxUser]);

  return (

    <div>
    <ToastProvider>
      <AppRoutes isAuthenticated={isAuthenticated} />
      {!isAuthenticated && <LoginBar />}
    </ToastProvider>
    </div>
  );
}

export default App;
