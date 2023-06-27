import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBookmark, removeBookmark } from "api/tweetApi";
import useToast from "@hooks/useToast";

export const useBookmarkMutation = (tweetId: string) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const addBookmarkMutation = useMutation({
    mutationKey: ["addBookmark", tweetId],
    mutationFn: addBookmark,
    onError: (err: any) => {
      console.log(err);
      showToast(err?.message || "error", "error");
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(["tweet", tweetId]);
      queryClient.invalidateQueries(["bookmarks"]);
      showToast(res?.message || "Tweet added to your Bookmarks", "info");
    },
  });

  const removeBookmarkMutation = useMutation({
    mutationKey: ["removeBookmark", tweetId],
    mutationFn: removeBookmark,
    onError: (err: any) => {
      console.log(err);
      showToast(err?.message || "error", "error");
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(["bookmarks"]);
      showToast(res?.message || "Tweet removed from your Bookmarks", "info");
    },
  });

  return { addBookmarkMutation, removeBookmarkMutation };
};