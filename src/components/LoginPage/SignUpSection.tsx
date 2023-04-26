import React from "react";

const SignUpSection = () => {

  return (
    <div className="flex flex-col">
      <div className="h-10 my-3">
        <button className="w-full h-full rounded-full bg-black text-white hover:brightness-200 ">
          <div className="flex flex-row justify-center items-center">
            <span className="font-bold">Create account</span>
          </div>
        </button>
      </div>
      <div>
        <span className="text-sm text-gray-500">
          By signing up, you agree to the
          <a href="https://twitter.com/tos" className="text-primary-dark">
            {" "}
            Terms of Service{" "}
          </a>
          and{" "}
          <a href="https://twitter.com/privacy" className="text-primary-dark">
            Privacy Policy
          </a>
          , including
          <a
            href="https://help.twitter.com/rules-and-policies/twitter-cookies"
            className="text-primary-dark"
          >
            {" "}
            Cookie Use.
          </a>
        </span>
      </div>
      <span className="mt-10 text-base text-gray-500">
        Have an account already?{" "}
        <a href="/login" className="text-primary-dark hover:underline underline-offset-auto">
          Log in
        </a>
      </span>

      <div className="h-32"></div>
      
    </div>
  );
};

export default SignUpSection;
