import React from "react";
import { AddThreadIcon, DropDownMenuArrowIcon } from "@icons/Icon";

interface Choice {
  id: number;
  text: string;
}

interface IProps {
  setShowPoll: React.Dispatch<React.SetStateAction<boolean>>;
  choices: Choice[];
  setChoices: React.Dispatch<React.SetStateAction<Choice[]>>;
  pollLength: { days: number; hours: number; minutes: number };
  setPollLength: React.Dispatch<React.SetStateAction<{ days: number; hours: number; minutes: number }>>;
}

const PollCreation: React.FC<IProps> = ({setShowPoll, choices, setChoices, pollLength, setPollLength}) => {
  

  const days = 8;
  const hours = 24;
  const minutes = 60;

  const handleChoiceChange = (id: number, text: string) => {
    setChoices(
      choices.map((choice) => (choice.id === id ? { ...choice, text } : choice))
    );
  };

  const handleRemovePoll = () => {
    setShowPoll(false)
  };

  const handleAddChoice = () => {
    setChoices([...choices, { id: choices.length + 1, text: "" }]);
  };

  const handlePollLengthChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: keyof typeof pollLength
  ) => {
    setPollLength({
      ...pollLength,
      [field]: parseInt(e.target.value, 10),
    });
  };
  

  console.log({
    choices,
    pollLength: pollLength
  });

  return (
    <div className="my-1 border rounded-2xl">
      <div className="pt-3">
        <div className="flex flex-col">
          <div className="px-3 flex flex-row">
            <div className="w-full flex flex-col">
              {choices.map((choice) => (
                
                <div key={choice.id} className="pb-3">
                  <div className="relative border-2 rounded-md focus-within:border-primary-base">
                    <input
                      type="text"
                      name="Choice1"
                      placeholder=" "
                      maxLength={25}
                      className="block pt-3 mt-4 pb-2 px-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
                      value={choice.text}
                      onChange={(e) =>
                        handleChoiceChange(choice.id, e.target.value)
                      }
                    />
                    <label
                      htmlFor="Choice1"
                      className="absolute top-0 text-lg p-4 -z-10 duration-300 origin-0"
                    >
                      Choice {choice.id} {choice.id > 2 && "(optional)"}
                    </label>
                    <label
                      htmlFor="Choice1"
                      className="second-label text-lg p-4"
                    >
                      {choice.text.length} / 25
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {choices.length < 4 && (
              <div className="flex flex-col-reverse">
                <div className="mb-6 ml-1">
                  <button
                    type="button"
                    onClick={handleAddChoice}
                    className="flex w-8 h-8 justify-center items-center rounded-full hover:bg-primary-extraLight text-primary-base duration-200"
                  >
                    <span className="justify-center">
                      <AddThreadIcon className={"w-5 h-5"} />
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <hr />

          <div className="p-3">
            <div className="mb-1">
              <span>Poll length</span>
            </div>

            <div className="flex flex-row justify-center">
              <div className="flex flex-col relative mr-5 grow border rounded-md">
                <label
                  htmlFor="selector1"
                  className="absolute px-2 pt-2 leading-4 text-sm"
                >
                  <span>Days</span>
                </label>
                <select
                  name="selector1"
                  value={pollLength.days}
                  onChange={(e) => handlePollLengthChange(e, "days")}
                  className="bg-transparent w-full mt-4 pt-3 pb-2 px-2 leading-5 appearance-none outline-none cursor-pointer"
                >
                  {
                    [...Array(days)].map((_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))
                  }
                </select>
                <div className="absolute -z-10 top-0 right-3 h-full flex items-center">
                  <div className="pointer-events-none">
                    <DropDownMenuArrowIcon />
                  </div>
                </div>
              </div>

              
              <div className="flex flex-col relative mr-5 grow border rounded-md">
                <label
                  htmlFor="selector1"
                  className="absolute px-2 pt-2 leading-4 text-sm"
                >
                  <span>Hours</span>
                </label>
                <select
                  name="selector1"
                  value={pollLength.hours}
                  onChange={(e) => handlePollLengthChange(e, "hours")}
                  className="bg-transparent w-full mt-4 pt-3 pb-2 px-2 leading-5 appearance-none outline-none cursor-pointer"
                >
                  {
                    [...Array(hours)].map((_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))
                  }
                </select>
                <div className="absolute -z-10 top-0 right-3 h-full flex items-center">
                  <div className="pointer-events-none">
                    <DropDownMenuArrowIcon />
                  </div>
                </div>
              </div>
              
              
              <div className="flex flex-col relative grow border rounded-md">
                <label
                  htmlFor="selector1"
                  className="absolute px-2 pt-2 leading-4 text-sm"
                >
                  <span>Minutes</span>
                </label>
                <select
                  name="selector1"
                  value={pollLength.minutes}
                  onChange={(e) => handlePollLengthChange(e, "minutes")}
                  className="bg-transparent w-full mt-4 pt-3 pb-2 px-2 leading-5 appearance-none outline-none cursor-pointer"
                >
                  {
                    [...Array(minutes)].map((_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))
                  }
                </select>
                <div className="absolute -z-10 top-0 right-3 h-full flex items-center">
                  <div className="pointer-events-none">
                    <DropDownMenuArrowIcon />
                  </div>
                </div>
              </div>

            </div>
          </div>

          <hr />

          <div className="rounded-b-2xl h-14 hover:bg-red-remove duration-200">
            <button className="w-full h-full overflow-hidden text-red-removeText" onClick={handleRemovePoll}>
              Remove Poll
            </button>
          </div>


        </div>
      </div>
    </div>
  );
};

export default React.memo(PollCreation);
