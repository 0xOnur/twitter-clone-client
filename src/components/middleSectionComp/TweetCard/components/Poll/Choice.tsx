import { VotedIcon } from "@icons/Icon";
import classNames from "classnames";

interface IProps {
  poll: IPoll;
  choice: IChoice;
  isWinner: boolean;
  isVoted?: boolean;
  reduxUserId: string | undefined;
  handleVote: (choiceId: string) => void;
}

const Choice = ({
  poll,
  choice,
  isWinner,
  reduxUserId,
  handleVote,
}: IProps) => {
  const votedChoice = choice.votes && choice.votes.includes(reduxUserId!);

  const percentage = Math.floor(choice?.percentage!);

  const percentageStyle = choice.percentage ? `${percentage}%` : "1.4%";

  const isPollExpired =
    Date.parse(new Date(poll?.expiresAt!).toISOString()) < Date.now();

  const isPollAuthor = poll?.author === reduxUserId;
  
  const isVoted = poll?.choices
    .map((choice) => choice.votes)
    .flat()
    .includes(reduxUserId);

  const choiceResultClassNames = classNames("absolute h-full rounded-sm", {
    "bg-[color:var(--color-primary)] opacity-50": isPollExpired && isWinner,
    "bg-[color:var(--color-base-secondary)] opacity-30": !isPollExpired || !isWinner,
  });

  if (isPollAuthor || isPollExpired || isVoted) {
    return (
      <div className="flex flex-row relative py-1 items-center justify-between">
        <div
          className={choiceResultClassNames}
          style={{ width: percentageStyle }}
        />
        <div className="z-10">
          <span className="flex items-center gap-1 ml-3 font-semibold [color:var(--color-base)]">
            {choice.text} {votedChoice && <VotedIcon className="w-5 h-5" />}
          </span>
        </div>
        <span className="z-10 mr-3 font-semibold [color:var(--color-base)]">{percentage || 0}%</span>
      </div>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleVote(choice._id.toString());
      }}
      className="relative w-full py-1 border rounded-3xl border-[color:var(--color-primary)] group overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.13] group-hover:bg-[color:var(--color-primary)] duration-200" />
      <span className="font-bold text-[color:var(--color-primary)]">
        {choice.text}
      </span>
    </button>
  );
};

export default Choice;
