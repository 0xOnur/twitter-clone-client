import { VotedIcon } from "@icons/Icon";
import classNames from "classnames";

interface IProps {
  choice: {
    _id: number | string;
    text: string;
    votes: string[];
    percentage?: number;
  };
  isPollOwner: boolean;
  isExpired: boolean;
  isVoted?: boolean;
  reduxUserId: string | undefined;
  handleVote: (choiceId: string) => void;
}

const Choice = ({ choice, isPollOwner, isExpired, isVoted, reduxUserId, handleVote }: IProps) => {

  const votedChoice = choice.votes.includes(reduxUserId!)

  const percentageWidthClass =
    choice.percentage
      ? `w-[${Math.floor(choice.percentage)}%]`
      : "w-[1.4%]";

  const percentageClass = classNames(
    "absolute bg-gray-defaultCover h-full rounded-md",
    percentageWidthClass
  );

  if (isPollOwner || isExpired || isVoted) {
    return (
      <div className="flex flex-row relative py-1 items-center justify-between">
        <div className={percentageClass} />
        <div className="z-10">
          <span className="flex items-center gap-1 ml-3">{choice.text} {votedChoice && <VotedIcon className="w-5 h-5" />}</span>
        </div>
        <span className="z-10 mr-3">{Math.floor(choice?.percentage!) || 0}%</span>
      </div>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleVote(choice._id.toString());
      }}
      className="w-full py-1 border rounded-3xl border-primary-base hover:bg-primary-light"
    >
      <span className=" font-bold text-primary-base">{choice.text}</span>
    </button>
  );
};

export default Choice;
