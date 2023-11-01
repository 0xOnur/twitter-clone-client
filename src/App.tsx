import { ModalProvider } from "contexts/ModalContext";
import { ToastProvider } from "contexts/ToastContext";
import React, { useState, useEffect } from "react";
import { RootState } from "@redux/config/store";
import { LoginBar } from "@components/index";
import { useSelector } from "react-redux";
import AppRoutes from "routes";
import { useAppearance } from "@redux/slices/appearanceSlice";

function App() {
  const reduxUser = useSelector((state: RootState) => state.user);
  const appearance = useAppearance()

  const [isAuthenticated, setAuthenticated] = useState(
    reduxUser.isAuthenticated
  );

  useEffect(() => {
    setAuthenticated(reduxUser.isAuthenticated);
  }, [reduxUser]);

  useEffect(() => {

		document.documentElement.style.setProperty('--background-primary', appearance.theme.primary)
		document.documentElement.style.setProperty('--background-primary-alpha', appearance.theme.primary + 'a6')
		document.documentElement.style.setProperty('--background-secondary', appearance.theme.secondary)
		document.documentElement.style.setProperty('--background-third', appearance.theme.third)
		document.documentElement.style.setProperty('--background-modal', appearance.theme.modal)

		document.documentElement.style.setProperty('--color-primary', appearance.color.primary)
		document.documentElement.style.setProperty('--color-secondary', appearance.color.secondary)
		document.documentElement.style.setProperty('--color-base', appearance.color.base)
		document.documentElement.style.setProperty('--color-base-secondary', appearance.color.baseSecondary)

		document.documentElement.style.setProperty('--box-shadow', appearance.boxShadow)

		document.documentElement.style.setProperty('--font-size', appearance.fontSize + 'px')

	}, [appearance])

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
