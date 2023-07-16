import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationAsRead } from "api/userApi";

interface IProps {
  notificationId: string;
}

export const useMarkNotification = ({ notificationId }: IProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["readNotification", notificationId],
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  return mutation;
};
