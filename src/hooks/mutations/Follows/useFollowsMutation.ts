import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser, unFollowUser, updateRedux } from "api/userApi";
import { UserState } from "@redux/slices/userSlice";
import { AppDispatch } from "redux/config/store";
import { useDispatch } from "react-redux";
import useToast from "@hooks/useToast";

interface IProps {
  reduxUser: UserState;
  username: string;
  setButtonText?: React.Dispatch<
    React.SetStateAction<"Following" | "Unfollow">
  >;
}

const useFollowsMutation = ({ reduxUser, username, setButtonText }: IProps) => {
  const dispatch: AppDispatch = useDispatch();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const followUserMutation = useMutation({
    mutationKey: ["followUser", username],
    mutationFn: followUser,
    onError: (err: any) => {
      console.log(err);
      showToast(err?.message || "error", "error");
    },
    onSuccess: (res) => {
      dispatch(updateRedux(reduxUser.user.username));
      queryClient.invalidateQueries(["user", username]);
      setButtonText && setButtonText("Following");
      showToast(res?.message || "User followed", "info");
    },
  });

  const unFollowUserMutation = useMutation({
    mutationKey: ["unFollowUser", username],
    mutationFn: unFollowUser,
    onError: (err: any) => {
      console.log(err);
      showToast(err?.message || "error", "error");
    },
    onSuccess: (res) => {
      dispatch(updateRedux(reduxUser.user.username));
      queryClient.invalidateQueries(["user", username]);
      setButtonText && setButtonText("Unfollow");
      showToast(res?.message || "User unfollowed", "info");
    },
  });

  return { followUserMutation, unFollowUserMutation };
};

export default useFollowsMutation;
