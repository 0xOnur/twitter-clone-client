import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ITweet } from '@customTypes/TweetTypes';
import { DeleteTweetIcon } from '@icons/Icon'
import { deleteTweet } from 'api/tweetApi';
import useToast from '@hooks/useToast';

interface IProps {
    tweet: ITweet;
    onClose: () => void;
}

const DeleteItem = ({ tweet, onClose }: IProps) => {
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
            showToast(res?.message ||"Your Tweet was deleted", "success");
        },
    });

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onClose();
                deleteTweetMutation.mutate(tweet._id);
            }}
            className="flex flex-row  hover:bg-gray-lightest font-bold"
        >
            <div className="flex flex-row py-3 px-4 items-center">
                <div className="mr-2">
                    <DeleteTweetIcon className={"w-5 h-5 text-red-removeText"} />
                </div>
                <div>
                    <span className='text-red-removeText'>Delete</span>
                </div>
            </div>
        </button>
    )
}

export default DeleteItem