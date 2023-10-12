import { AddThreadIcon, DropDownMenuArrowIcon } from "@icons/Icon";
import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { setShowPoll, setPollChoice, addPollChoice, setPollExpiresAt } from "@redux/slices/composerSlice";

interface IProps {
  poll: IPoll;
}
type DurationType = "days" | "hours" | "minutes";

const durationOptions: Record<DurationType, number> = {
  days: 8,
  hours: 24,
  minutes: 60,
};

const PollEditor = ({ poll }: IProps) => {
  const dispatch = useDispatch();
  const [pollDuration, setPollDuration] = useState({ days: 1, hours: 0, minutes: 0 });

  const handleChoiceChange = (id: number| string, text: string) => {
    const index = poll.choices.findIndex((choice) => choice._id === id);
    dispatch(setPollChoice({index, text}));
  };

  const handleAddChoice = () => {
    const newChoice = {
      _id: poll.choices.length + 1,
      text: "",
      votes: [],
    }
    dispatch(addPollChoice(newChoice));
  };

  const changePollTimer = (
    e: React.ChangeEvent<HTMLSelectElement>,
    type: DurationType
  ) => {
    const newDuration = { ...pollDuration, [type]: parseInt(e.target.value) };
    setPollDuration(newDuration);
    
    // Calculate expiresAt date
    const expiresAt = new Date(
      Date.now() +
      newDuration.days * 24 * 60 * 60 * 1000 +
      newDuration.hours * 60 * 60 * 1000 +
      newDuration.minutes * 60 * 1000
    );

    dispatch(setPollExpiresAt(expiresAt.toISOString()));
  };

  const TimeSelect = ({ type }: { type: DurationType }) => (
    <div className="flex flex-col relative mr-5 grow border rounded-md">
      <label
        htmlFor={`selector-${type}`}
        className="absolute px-2 pt-2 leading-4 text-sm"
      >
        <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
      </label>
      <select
        id={`selector-${type}`}
        name={`selector-${type}`}
        value={pollDuration[type]}
        onChange={(e) => changePollTimer(e, type)}
        className="bg-transparent w-full mt-4 pt-3 pb-2 px-2 leading-5 appearance-none outline-none cursor-pointer"
      >
        {[...Array(durationOptions[type])].map((_, i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
      <div className="absolute -z-10 top-0 right-3 h-full flex items-center">
        <div className="pointer-events-none">
          <DropDownMenuArrowIcon />
        </div>
      </div>
    </div>
  );

  return (
    <div className="my-1 border rounded-2xl z-10">
      <div className="pt-3">
        <div className="flex flex-col">
          <div className="px-3 flex flex-row">
            <div className="w-full flex flex-col">
              {poll.choices.map((choice) => (
                <div key={choice._id} className="pb-3">
                  <div className="relative border-2 rounded-md focus-within:border-primary-base">
                    <input
                      type="text"
                      name="Choice1"
                      placeholder=" "
                      maxLength={25}
                      className="block pt-3 mt-4 pb-2 px-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
                      value={choice.text}
                      onChange={(e) =>
                        handleChoiceChange(choice._id, e.target.value)
                      }
                    />
                    <label
                      htmlFor="Choice1"
                      className="absolute top-0 text-lg p-4 -z-10 duration-300 origin-0"
                    >
                      Choice {choice._id} {Number(choice._id) > 2 && "(optional)"}
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
            {poll.choices.length < 4 && (
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
              <TimeSelect type="days" />
              <TimeSelect type="hours" />
              <TimeSelect type="minutes" />
            </div>
          </div>

          <hr />

          <div className="rounded-b-2xl h-14 hover:bg-red-remove duration-200">
            <button
              className="w-full h-full overflow-hidden text-red-removeText"
              onClick={() => dispatch(setShowPoll(false))}
            >
              Remove Poll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollEditor;
