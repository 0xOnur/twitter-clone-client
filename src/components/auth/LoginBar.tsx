// components/LoginBar.tsx
import React, {useState} from "react";
import AuthModal from "./AuthModal";


const LoginBar: React.FC = () => {

  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const handleLogin = () => {
    setAuthMode("login");
    setShowModal(true);
  };

  const handleSignUp = () => {
    setAuthMode("signup");
    setShowModal(true);
  };

  return (
    <>
    {showModal && (
        <AuthModal
          isOpen={showModal}
          setOpen={setShowModal}
          mode={authMode}
        />
      )}
    <div className="fixed bottom-0 left-0 w-full bg-primary-base shadow-md">
      <div className="container mx-auto px-4">
        <div className="my-3 flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <span className="leading-7 text-xl font-bold text-white">
              Don’t miss what’s happening
            </span>
            <span className="leading-5 text-white">
              People on Twitter are the first to know.
            </span>
          </div>
          <div className="mx-4">
            <div className="flex flex-row items-stretch">
              <div>
                <button
                  onClick={handleLogin}
                  className="border border-white bg-transparent hover:backdrop-brightness-110 duration-200 rounded-full outline-none min-w-max h-9"
                >
                  <span className="font-bold text-white px-4">Log in</span>
                </button>
              </div>
              <div className="ml-3">
                <button
                  onClick={handleSignUp}
                  className="font-bold border border-white bg-white hover:brightness-90 duration-200 rounded-full outline-none min-w-max h-9 px-4"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginBar;
