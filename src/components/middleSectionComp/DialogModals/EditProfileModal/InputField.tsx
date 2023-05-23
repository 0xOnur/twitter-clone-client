import React from "react";

interface IProps {
  type: "input" | "textarea";
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  maxLength: number;
  labelText: string;
}

const InputField = ({
  type,
  value,
  onChange,
  maxLength,
  labelText,
}: IProps) => {
  switch (type) {
    case "input":
      return (
        <div className="flex flex-col px-4">
          <div className="py-3">
            <div className="relative border-2 border-gray-300 rounded-lg focus-within:border-primary-base">
              <input
                type="text"
                placeholder=" "
                maxLength={maxLength}
                value={value}
                onChange={onChange}
                className="block pt-3 mt-4 pb-2 px-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
              />
              <label className="absolute top-0 text-lg text-gray-500 p-4 -z-10 duration-300 origin-0">
                {labelText}
              </label>
              <label htmlFor="Choice1" className="second-label text-lg p-4">
                {value?.length | 0} / {maxLength}
              </label>
            </div>
          </div>
        </div>
      );
    case "textarea":
      return (
        <div className="flex flex-col px-4">
          <div className="py-3">
            <div className="relative border-2 border-gray-300 rounded-lg focus-within:border-primary-base">
              <textarea
                value={value}
                placeholder=" "
                maxLength={maxLength}
                onChange={onChange}
                className="block mt-6 pb-2 px-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
              />
              <label className="absolute top-0 text-lg text-gray-500 p-4 -z-10 duration-300 origin-0">
                Bio
              </label>
              <label htmlFor="Choice1" className="second-label text-lg p-4">
                {value?.length | 0} / {maxLength}
              </label>
            </div>
          </div>
        </div>
      );
    default:
      break;
  }

  return null;
};

export default InputField;
