import { useMutation, useQueryClient } from "@tanstack/react-query";
import useWinnerChoice from "@hooks/Poll/useWinnerChoice";
import { votePoll } from "api/tweetApi";
import { RootState } from "@redux/config/store";
import { LoadingIcon } from "@icons/Icon";
import { useSelector } from "react-redux";
import useToast from "@hooks/useToast";
import Choice from "./Choice";
import {
  formatTimeRemaining,
  getTimeRemaining,
} from "@utils/formatTimeRemaining";
import useGetPoll from "@hooks/Poll/Queries/useGetPoll";
import { RefetchError } from "@components/Others";


interface IProps {
  isAuthenticated: boolean;
  pollId: string;
}

const Poll = ({ isAuthenticated, pollId }: IProps) => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const {poll, refetch, status} = useGetPoll(pollId)

  const voteMutation = useMutation({
    mutationKey: ["votePoll", pollId],
    mutationFn: (choiceId: string) => votePoll(pollId, choiceId),
    onError: (err: any) => {
      console.log(err);
      showToast(err?.message || "error", "error");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["poll", pollId]);
    },
  });

  const handleVote = (choiceId: string) => {
    if (isAuthenticated) {
      voteMutation.mutate(choiceId);
    }
  };

  const winnerChoiceId = useWinnerChoice(poll?.choices);

  if (status === "loading") {
    return (
      <div className="flex w-full items-center justify-center">
        <LoadingIcon />
      </div>
    );
  }

  if(status === "error") {
    return (
      <RefetchError refetch={refetch} />
    )
  }

  if (status === "success" && poll) {
    return (
      <div className="flex flex-col gap-2 my-3">
        {poll.choices.map((choice) => (
          <Choice
            key={choice._id}
            choice={choice}
            poll={poll}
            reduxUserId={reduxUser.user?._id}
            handleVote={handleVote}
            isWinner={choice._id === winnerChoiceId}
          />
        ))}
        <div className="flex flex-row gap-2 text-[color:var(--color-base-secondary)]">
          <span>{poll.totalVotes || 0} Vote</span>
          <span>-</span>
          <span>
            {formatTimeRemaining(getTimeRemaining(poll.expiresAt)) || 0}
          </span>
        </div>
      </div>
    );
  }

  return null;
};

export default Poll;
