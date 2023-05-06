import React, {useEffect} from "react";
import AuthBody from "./AuthBody";

interface IProps {
  isOpen: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
  mode: "login" | "signup";
  isRoute?: boolean;
}

const AuthModal = ({ isOpen, setOpen, onClose, mode, isRoute }: IProps) => {
  const title = mode === "login" ? "Sign in to Twitter" : "Join Twitter today.";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" />
      <div className="z-10 text-black bg-white w-full max-w-600px min-h-400px rounded-xl overflow-hidden">
        <div className="overflow-y-auto max-h-90vh">
          <div className="flex flex-col relative h-650px ">
            {/* Body */}
            <AuthBody
              title={title}
              mode={mode}
              isRoute={isRoute}
              setOpen={setOpen}
            />
            {/* Body */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
