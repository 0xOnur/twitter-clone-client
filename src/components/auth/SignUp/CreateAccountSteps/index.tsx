import React, { useState } from "react";
import AuthHeader from "@components/auth/AuthHeader";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";

interface StepData {
  [key: number]: any;
}

interface IProps {
  isRoute?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateAccountSteps = ({isRoute, setOpen}:IProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepData, setStepData] = useState<StepData>({});

  console.log(stepData);

  const onStepData = (step: number, data: any) => {
    setStepData((prevStepData) => ({ ...prevStepData, [step]: data }));
  };

  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const renderStep = () => {

    switch (currentStep) {
      case 1:
        return <Step1 onNext={handleNextStep} onStepData={onStepData} prevData={stepData[currentStep]} />;
      case 2:
        return <Step2 onNext={handleNextStep} onStepData={onStepData} />;
      case 3:
        return <Step3 onNext={handleNextStep} onStepData={onStepData} prevData={stepData[currentStep]} />;
      case 4:
        return <Step4 onNext={handleNextStep} onStepData={onStepData} prevData={stepData[currentStep]} />;
      case 5:
        return <Step5 onNext={handleNextStep} onStepData={onStepData} prevData={stepData[currentStep]} />;
      case 6:
        return <Step6 onStepData={onStepData} prevData={stepData[currentStep]} />;
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <>
      {currentStep >= 2 ? (
        <AuthHeader
          currentStep={currentStep}
          handlePreviousStep={handlePreviousStep}
        />
      ) : (
        <AuthHeader isRoute={isRoute} setOpen={setOpen} />
      )}
      {renderStep()}
    </>
  );
};

export default CreateAccountSteps;
