import React, { useState } from "react";
import { DropDownMenuArrowIcon } from "@icons/Icon";
import classNames from "classnames";

interface StepProps {
  onNext: () => void;
  onStepData: (step: number, data: any) => void;
  prevData: {
    displayName: string;
    email: string;
    month: number;
    day: number;
    year: number;
  };
}

const Step1 = ({ onNext, onStepData, prevData }: StepProps) => {
  const currentYear = new Date().getFullYear() - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = 31;
  const years = currentYear - 1950;

  const [userInfo, setUserInfo] = useState(prevData || {
    displayName: "",
    email: "",
    month: 1,
    day: 1,
    year: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevData) => ({ ...prevData, [name]: value }));
  };

  const nextButtonClassNames = classNames(
    " font-bold py-2 px-4 w-full h-full rounded-full ",
    {
      "bg-black text-white hover:brightness-200":
      userInfo.displayName && userInfo.email && userInfo.month && userInfo.day && userInfo.year,
      "bg-gray-300 text-gray-500 cursor-not-allowed":
        !userInfo.displayName && !userInfo.email,
    }
  );

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userInfo.displayName && userInfo.email && userInfo.month && userInfo.day && userInfo.year) {
      onStepData(1, userInfo);
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-full">

    <div className="flex flex-col justify-between px-20 h-full">
        <div className="w-full">
          <div className="flex justify-start py-5">
            <h2 className="relative text-3xl font-bold mb-6">
              Create your account
            </h2>
          </div>
          <div className="py-3">
            <div className="relative border-2 border-gray-300 rounded-lg focus-within:border-primary-base">
              <input
                type="text"
                name="displayName"
                required={true}
                placeholder=" "
                maxLength={50}
                onChange={handleChange}
                value={userInfo.displayName}
                className="block pt-3 mt-4 pb-2 px-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
              />
              <label className="absolute top-0 text-lg text-gray-500 p-4 -z-10 duration-300 origin-0">
                Name
              </label>
              <label htmlFor="Choice1" className="second-label text-lg p-4">
                {userInfo.displayName.length} / 50
              </label>
            </div>
          </div>
          <div className="py-3">
            <div className="relative border-2 border-gray-300 rounded-lg focus-within:border-primary-base">
              <input
                type="email"
                name="email"
                required={true}
                placeholder=" "
                maxLength={25}
                onChange={handleChange}
                value={userInfo.email}
                className="block pt-3 mt-4 pb-2 px-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
              />
              <label className="absolute top-0 text-lg text-gray-500 p-4 -z-10 duration-300 origin-0">
                Email
              </label>
            </div>
          </div>
          <div className="flex flex-col py-3">
            <span className="mb-2 font-bold">Date of birth</span>
            <span className="mb-1 text-sm">
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </span>
            <div>
              <div className="flex flex-row my-4">
                <div className="flex flex-col relative mr-5 grow border rounded-md">
                  <label className="absolute px-2 pt-2 leading-4 text-sm">
                    <span>Month</span>
                  </label>
                  <select
                    name="month"
                    onChange={handleDateChange}
                    value={userInfo.month}
                    className="bg-transparent w-full mt-4 pt-3 pb-2 px-2 leading-5 appearance-none outline-none cursor-pointer"
                  >
                    {months.map((month, i) => (
                      <option key={i + 1} value={i + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <div className="absolute -z-10 top-0 right-3 h-full flex items-center">
                    <div className="pointer-events-none">
                      <DropDownMenuArrowIcon />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col relative mr-5 grow border rounded-md">
                  <label className="absolute px-2 pt-2 leading-4 text-sm">
                    <span>Days</span>
                  </label>
                  <select
                    name="day"
                    onChange={handleDateChange}
                    value={userInfo.day}
                    className="bg-transparent w-full mt-4 pt-3 pb-2 px-2 leading-5 appearance-none outline-none cursor-pointer"
                  >
                    {[...Array(days)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <div className="absolute -z-10 top-0 right-3 h-full flex items-center">
                    <div className="pointer-events-none">
                      <DropDownMenuArrowIcon />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col relative grow border rounded-md">
                  <label className="absolute px-2 pt-2 leading-4 text-sm">
                    <span>Year</span>
                  </label>
                  <select
                    name="year"
                    onChange={handleDateChange}
                    value={userInfo.year}
                    className="bg-transparent w-full mt-4 pt-3 pb-2 px-2 leading-5 appearance-none outline-none cursor-pointer"
                  >
                    {[...Array(years)].map((_, i) => {
                      const year = currentYear - i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                  <div className="absolute -z-10 top-0 right-3 h-full flex items-center">
                    <div className="pointer-events-none">
                      <DropDownMenuArrowIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="h-14 my-3">
            <button type="submit" className={nextButtonClassNames}>
              <div className="flex flex-row justify-center items-center">
                <span className="font-bold">Next</span>
              </div>
            </button>
          </div>
        </div>
    </div>
    </form>

  );
};

export default Step1;
