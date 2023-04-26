// components/AuthModal.tsx
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { CancelIcon, TwitterIcon } from "@icons/Icon";
import SignInSection from "./SignInSection";
import SignUpSection from "./SignUpSection";
import PasswordScreen from "./PasswordScreen";
import SocialAuthButtons from "./SocialAuthButtons";

interface IProps {
  isOpen: boolean;
  onClose?: () => void;
  mode: "login" | "signup";
  isRoute?: boolean;
}

const AuthModal: React.FC<IProps> = ({ isOpen, onClose, mode, isRoute }) => {
  const title = mode === "login" ? "Sign in to Twitter" : "Join Twitter today.";

  const [username, setUsername] = useState(String);
  const [password, setPassword] = useState(String);

  const [showPasswordSection, setPasswordMode] = useState(false);

  return (
    <Dialog
      open={isOpen || isRoute}
      onClose={() => onClose?.()}
      initialFocus={undefined}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />

      <div className="z-10 text-black bg-white w-full max-w-xl rounded-xl overflow-hidden">
        <div className="overflow-y-auto max-h-90vh">
          <div className="flex flex-col relative ">
            {/* Header */}
            <div className="flex flex-row h-14 px-4 w-full justify-center items-center">
              <div className="flex-auto">
                {!isRoute && (
                  <button
                    onClick={onClose}
                    className="relative group text-white hover:bg-slate-800 rounded-full p-2"
                  >
                    <CancelIcon className={"w-5 h-5"} />
                  </button>
                )}
              </div>
              <div className="flex-auto">
                <TwitterIcon className={"w-8 -ml-4 text-primary-base"} />
              </div>
            </div>
            {/* Header */}

            {/* Body */}
            {!showPasswordSection ? (
              <div>
                <div className="flex flex-col px-8 pb-12 ml-auto mr-auto max-w-sm">
                  <SocialAuthButtons title={title} mode={mode} />

                  <div className="my-3">
                    <div className="flex flex-row h-2 w-full mx-1 items-center">
                      <div className="h-0.5 w-full mx-1 bg-gray-300"></div>
                      <span className="mx-1 font-semibold">or</span>
                      <div className="h-0.5 w-full mx-1 bg-gray-300"></div>
                    </div>
                  </div>

                  {mode === "login" ? (
                    <SignInSection
                      setPasswordMode={setPasswordMode}
                      username={username}
                      setUsername={setUsername}
                    />
                  ) : (
                    <SignUpSection />
                  )}
                </div>
              </div>
            ) : (
              <PasswordScreen
                username={username}
                password={password}
                setPassword={setPassword}
              />
            )}

            {/* Body */}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AuthModal;
