import React from "react";

const Terms = () => {
  return (
    <>
        <span className="text-sm text-gray-500">
          By signing up, you agree to the
          <a
            href="https://twitter.com/tos"
            target="_blank"
            rel="noreferrer"
            className="text-primary-dark"
          >
            {" "}
            Terms of Service{" "}
          </a>
          and{" "}
          <a
            href="https://twitter.com/privacy"
            target="_blank"
            rel="noreferrer"
            className="text-primary-dark"
          >
            Privacy Policy
          </a>
          , including
          <a
            href="https://help.twitter.com/rules-and-policies/twitter-cookies"
            target="_blank"
            rel="noreferrer"
            className="text-primary-dark"
          >
            {" "}
            Cookie Use.
          </a>
        </span>
    </>
  );
};

export default Terms;
