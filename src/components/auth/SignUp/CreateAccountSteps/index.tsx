import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "redux/config/store";
import { createUser } from "api/userApi";
import AuthHeader from "@components/auth/Modal/AuthHeader";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import { LoadingIcon } from "@icons/Icon";
import useToast from "@hooks/useToast";

interface IProps {
  isRoute?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateAccountSteps = ({ isRoute, setOpen }: IProps) => {
  const dispatch: AppDispatch = useDispatch();
  const redux = useSelector((state: RootState) => state.user);
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState({
    displayName: "",
    month: 1,
    day: 1,
    year: 1,
    email: "",
    password: "",
    username: "",
    bio: "",
    avatar: null,
    avatarURL: "",
  });

  const onStepData = (userInfo: any) => {
    setUser({ ...user, ...userInfo });
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

  const handleCreateAccount = async () => {
    const formData = new FormData();
    const birthDay = {
      day: user.day.toString(),
      month: user.month.toString(),
      year: user.year.toString(),
    };
    formData.append("displayName", user.displayName);
    // formData.append("month", user.month.toString());
    // formData.append("day", user.day.toString());
    // formData.append("year", user.year.toString());
    formData.append("birthDay", JSON.stringify(birthDay));
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("username", user.username);
    formData.append("bio", user.bio);

    if (user.avatar) {
      formData.append("avatar", user.avatar);
    }

    dispatch(createUser(formData)).then((res) => {
      if (res.meta.requestStatus === "rejected") {
        const error = store.getState().user.error.message;
        showToast(error || "An error occured", "error");
      }
    })
  };

  if (redux.isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingIcon />
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1 onNext={handleNextStep} onStepData={onStepData} user={user} />
        );
      case 2:
        return <Step2 onNext={handleNextStep} onStepData={onStepData} />;
      case 3:
        return (
          <Step3 onNext={handleNextStep} onStepData={onStepData} user={user} />
        );
      case 4:
        return (
          <Step4 onNext={handleNextStep} onStepData={onStepData} user={user} />
        );
      case 5:
        return (
          <Step5 onNext={handleNextStep} onStepData={onStepData} user={user} />
        );
      case 6:
        return (
          <Step6
            onStepData={onStepData}
            user={user}
            onStepComplete={handleCreateAccount}
          />
        );
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
