import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "@icons/Icon";
import { deleteTweet } from "api/tweetApi";
import useToast from "@hooks/useToast";

interface IProps {
  tweet: ITweet;
  closeMenu: () => void;
}

const DeleteItem = ({ tweet, closeMenu }: IProps) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteTweetMutation = useMutation({
    mutationKey: ["deleteTweet", tweet._id],
    mutationFn: deleteTweet,
    onError: (err: any) => {
      console.log(err);
      showToast(err?.message || "error", "error");
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries();
      showToast(res?.message || "Your Tweet was deleted", "success");
    },
  });

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        closeMenu();
        deleteTweetMutation.mutate(tweet._id);
      }}
      className="flex flex-row font-bold hover:bg-[color:var(--background-third)]"
    >
      <div className="flex flex-row py-3 px-4 items-center">
        <div className="mr-2">
          <TrashIcon className={"w-5 h-5 text-red-base"} />
        </div>
        <div>
          <span className="text-red-base">Delete</span>
        </div>
      </div>
    </button>
  );
};

export default DeleteItem;
