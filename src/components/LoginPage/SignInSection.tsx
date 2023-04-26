import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPasswordMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignInSection = ({ username, setUsername, setPasswordMode }: IProps) => {
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordMode(true);
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleNext}>
        <div className="py-3">
          <div className="relative border-2 border-gray-300 rounded-sm focus-within:border-primary-base">
            <input
              type="text"
              placeholder=" "
              maxLength={25}
              className="block pt-3 mt-4 pb-2 px-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="absolute top-0 text-lg text-gray-500 p-4 -z-10 duration-300 origin-0">
              Username
            </label>
          </div>
        </div>

        <div className="h-10 my-3">
          <button
            onClick={() => setPasswordMode(true)}
            type="submit"
            className="w-full h-full rounded-full bg-black text-white hover:brightness-200 duration-200"
          >
            <div className="flex flex-row justify-center items-center">
              <span className="font-bold">Next</span>
            </div>
          </button>
        </div>
      </form>
      <div className="h-10 my-3">
        <button
          className="w-full h-full border rounded-full bg-white text-black hover:bg-gray-200 duration-200"
          onClick={() => navigate("/reset_password")}
        >
          <div className="flex flex-row justify-center items-center">
            <span className="font-bold">Forgot password?</span>
          </div>
        </button>
      </div>

      <div className="mt-10">
        <span>Don't have an account? </span>
        <a
          href="/signup"
          className="text-primary-dark hover:underline underline-offset-auto"
        >
          Sign up
        </a>
      </div>

      <div className="h-32"></div>
    </div>
  );
};

export default SignInSection;
