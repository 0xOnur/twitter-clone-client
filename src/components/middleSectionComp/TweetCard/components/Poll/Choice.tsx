import { VotedIcon } from "@icons/Icon";

interface IProps {
  choice: {
    _id: number | string;
    text: string;
    votes?: string[];
    percentage?: number;
  };
  isPollOwner: boolean;
  isExpired: boolean;
  isVoted?: boolean;
  reduxUserId: string | undefined;
  handleVote: (choiceId: string) => void;
}

const Choice = ({
  choice,
  isPollOwner,
  isExpired,
  isVoted,
  reduxUserId,
  handleVote,
}: IProps) => {
  const votedChoice = choice.votes && choice.votes.includes(reduxUserId!);

  const percentage = Math.floor(choice?.percentage!);

  const percentageStyle = choice.percentage ? `${percentage}%` : "1.4%";

  if (isPollOwner || isExpired || isVoted) {
    return (
      <div className="flex flex-row relative py-1 items-center justify-between">
        <div
          className="absolute bg-gray-defaultCover h-full rounded-md"
          style={{ width: percentageStyle }}
        />
        <div className="z-10">
          <span className="flex items-center gap-1 ml-3">
            {choice.text} {votedChoice && <VotedIcon className="w-5 h-5" />}
          </span>
        </div>
        <span className="z-10 mr-3">{percentage || 0}%</span>
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
