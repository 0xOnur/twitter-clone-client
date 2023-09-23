import React from "react";

interface IProps {
  chatName: string;
  maxLength: number;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const ChatName = ({ chatName, maxLength, setName }: IProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className="relative w-full border border-gray-300 rounded-lg focus-within:border-primary-base">
      <input
        type="text"
        placeholder=" "
        maxLength={maxLength}
        value={chatName}
        onChange={handleChange}
        className="block pt-3 mt-4 px-2 pb-3 w-full text-[17px] leading-6 appearance-none focus:outline-none bg-transparent"
      />
      <label className="absolute top-0 text-lg text-gray-500 p-4 -z-10 duration-300 origin-0">
        Group name
      </label>
      <label htmlFor="Choice1" className="second-label text-lg p-4">
        {chatName?.length | 0} / {maxLength}
      </label>
    </div>
  );
};

export default ChatName;
