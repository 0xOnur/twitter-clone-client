import React from "react";

interface StepProps {
  onStepData: (data: {bio: string}) => void;
  onStepComplete: () => void;
  user: {
    bio: string;
  };
}

const Step6 = ({ onStepData, user, onStepComplete }: StepProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onStepData({bio: e.target.value});
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onStepComplete()
  }

  return (
    <form onSubmit={handleSubmit} className="h-full">
      <div className="flex flex-col justify-between px-20 h-full">
        <div>
          <div className="flex flex-col py-5">
            <h2 className="relative text-3xl font-bold ">
              Describe yourself
            </h2>
            <div className="mt-2">
              <p className="text-lg text-gray-500">
                What makes you special? Don't think too hard, just have fun with it.
              </p>
            </div>
          </div>
          <div className="py-3">
            <div className="relative border-2 border-gray-300 rounded-lg focus-within:border-[color:var(--color-primary)]">
              <input
                type="text"
                placeholder=" "
                maxLength={160}
                className="block pt-3 mt-4 pb-2 px-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
                value={user.bio}
                onChange={handleChange}
              />
              <label className="absolute origin-0 top-0 p-4 -z-10 text-lg text-[color:var(--color-base-secondary)] duration-300">
                Your bio
              </label>
              <label htmlFor="Choice1" className="second-label text-lg p-4">
                {user.bio.length} / 160
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="h-14 my-3">
            <button
              type="submit"
              className="w-full h-full rounded-full bg-black text-white hover:brightness-200"
            >
              <div className="flex flex-row justify-center items-center">
                <span className="font-bold">{user.bio ? "Next" : "Skip"}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Step6;
