import React from "react";
import Terms from "@components/auth/SignUp/Terms";
import classNames from "classnames";
interface StepProps {
  onNext: () => void;
  onStepData: (step: number, data: any) => void;
}

const Step2 = ({ onNext }: StepProps) => {
  const nextButtonClassNames = classNames(
    "font-bold py-2 px-4 w-full h-full rounded-full bg-black text-white hover:brightness-200"
  );

  return (
    <div className="flex flex-col justify-between px-20 h-full">
      <div className="flex flex-col ml-auto mr-auto">
        <div className="flex justify-start py-5">
          <h2 className="text-3xl font-bold mb-6">Customize your experience</h2>
        </div>
        <div>
          <span className="font-bold text-xl leading-6">
            Track where you see Twitter content across the web
          </span>
          <label
            htmlFor="checkbox1"
            className="flex flex-row justify-between  mt-3"
          >
            <span className="pr-3 leading-5">
              Twitter uses this data to personalize you experience. This web
              browsing history will never be stored with your name, email, or
              phone number.
            </span>
            <div>
              <div className="p-2 -m-2 h-9 w-9 cursor-pointer hover:bg-[color:var(--color-secondary)] rounded-full">
                <input
                  type="checkbox"
                  id="checkbox1"
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
          </label>
        </div>
        <div className="mt-10">
          <Terms />
        </div>
      </div>
      <div className="h-14 my-3">
        <button
          className={nextButtonClassNames}
          onClick={onNext}
        >
          <div className="flex flex-row justify-center items-center">
            <span className="font-bold">Next</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Step2;
