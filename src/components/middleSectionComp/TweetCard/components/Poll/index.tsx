import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPoll, votePoll } from "api/tweetApi";
import {
  formatTimeRemaining,
  getTimeRemaining,
} from "@utils/formatTimeRemaining";
import { RootState } from "@redux/config/store";
import { LoadingIcon } from "@icons/Icon";
import { useSelector } from "react-redux";
import Choice from "./Choice";
import useToast from "@hooks/useToast";

interface IProps {
isAuthenticated: boolean;
  pollId: string;
}

const Poll = ({ isAuthenticated, pollId }: IProps) => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const poll = useQuery<IPoll>({
    queryKey: ["poll", pollId],
    queryFn: () => getPoll(pollId),
    refetchOnWindowFocus: false,
    retry: false,
  });

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
    console.log("🚀 ~ file: index.tsx:44 ~ handleVote ~ choiceId:", choiceId)
    if (isAuthenticated) {
        voteMutation.mutate(choiceId);
    }else {
        showToast("You must be logged in to vote", "error");
    }
  }

  if (poll.isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <LoadingIcon />
      </div>
    );
  }

  const isPollExpired = Date.parse(new Date(poll.data?.expiresAt!).toISOString()) < Date.now()
  const isPollAuthor = poll.data?.author === reduxUser.user?._id;
  const isVoted = poll.data?.choices
    .map((choice) => choice.votes)
    .flat()
    .includes(reduxUser.user?._id);

  if (poll.data) {
    return (
      <div className="flex flex-col gap-2 mt-3">
        {poll.data.choices.map((choice) => (
          <Choice
            key={choice._id}
            choice={choice}
            reduxUserId={reduxUser.user?._id}
            handleVote={handleVote}
            isPollOwner={isPollAuthor}
            isExpired={isPollExpired}
            isVoted={isVoted}
          />
        ))}
        <div className="flex flex-row gap-2">
          <span>{poll.data?.totalVotes || 0} Vote</span>
          <span>-</span>
          <span>
            {formatTimeRemaining(getTimeRemaining(poll.data.expiresAt)) || 0}
          </span>
        </div>
      </div>
    );
  }

  return <div className="mt-3"></div>;
};

export default Poll;
