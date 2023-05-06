import React from "react";
import SignInSection from "@components/auth/SıgnIn/SignInSection";
import SignUpSection from "@components/auth/SignUp/SignUpSection";

interface IProps {
    title: string;
    mode: "login" | "signup";
    isRoute?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthBody = ({title, mode, isRoute, setOpen}:IProps) => {
  return (
        mode === "login" ? (
            <SignInSection title={title} mode={mode} isRoute={isRoute} setOpen={setOpen} />
        ) : (
            <SignUpSection title={title} mode={mode} isRoute={isRoute} setOpen={setOpen} />
        )
  )
};

export default AuthBody;
