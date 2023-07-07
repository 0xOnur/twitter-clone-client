import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IComposer, IPoll } from "@customTypes/index";
import { ITweet } from "@customTypes/TweetTypes";
import { ComposerComp } from "@components/index";
import { RootState } from "@redux/config/store";
import { TenorImage } from "gif-picker-react";
import { createTweet } from "api/tweetApi";
import { useSelector } from "react-redux";
import MediaCard from "./ComposerMedia";
import React, { useState } from "react";
import Toolbar from "./Toolbar";
import useToast from "@hooks/useToast";
import { LoadingIcon } from "@icons/Icon";
import { useComposerClean } from "@hooks/useComposerClean";
import classNames from "classnames";

type IProps = {
  composerMode: "tweet" | "reply" | "quote";
  originalTweet?: ITweet;
  onClose?: () => void;
};

const TweetComposer = ({ composerMode, originalTweet, onClose }: IProps) => {
  const queryClient = useQueryClient();
  const reduxUser = useSelector((state: RootState) => state.user);

  const { showToast } = useToast();
  const { cleanComposer } = useComposerClean();

  const [tweetText, setTweetText] = useState("");
  const [tenorGif, setTenorGif] = useState<TenorImage>();

  const [ComposerSettings, setComposerSettings] = useState<IComposer>({
    audience: "everyone",
    whoCanReply: "everyone",
    mediaFiles: [],
  });

  const [pollSettings, setPollSettings] = useState<IPoll>({
    choices: [
      {
        id: 1,
        text: "",
      },
      {
        id: 2,
        text: "",
      },
    ],
    duration: {
      days: 1,
      hours: 0,
      minutes: 0,
    },
    showPoll: false,
  });

  const createTweetMutation = useMutation({
    mutationKey: ["createTweet"],
    mutationFn: createTweet,
    onError: (err: any) => {
      showToast(err?.message || "error", "error");
    },
    onSuccess: (res) => {
      onClose && onClose();
      //clear all states
      cleanComposer({
        setTweetText,
        setTenorGif,
        setComposerSettings,
        setPollSettings,
      });
      showToast(res?.message || "Tweet created succesfully", "success");
      queryClient.invalidateQueries(["forYouFeed"]);
      queryClient.invalidateQueries(["followingFeed"]);
      queryClient.invalidateQueries(["tweet", originalTweet]);
      queryClient.invalidateQueries(["tweetStats", originalTweet]);
    },
  });

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    const formData = new FormData();

    formData.append("audience", ComposerSettings.audience);
    formData.append("whoCanReply", ComposerSettings.whoCanReply);
    formData.append("tweetType", composerMode);

    tweetText.length > 0 && formData.append("content", tweetText);

    if (originalTweet) {
      formData.append("originalTweet", originalTweet._id);
    }

    if (tenorGif) {
      const tenorMedia = [
        {
          url: tenorGif.url,
          type: "gif",
          alt: tenorGif.description,
        },
      ];
      formData.append("tenorMedia", JSON.stringify(tenorMedia));
    }

    if (pollSettings.showPoll) {
      formData.append("poll", JSON.stringify(pollSettings));
    }

    if (ComposerSettings.mediaFiles.length > 0) {
      ComposerSettings.mediaFiles.forEach((file) => {
        formData.append("mediaFiles", file.file);
        formData.append("mediaType", file.type);
      });
    }

    createTweetMutation.mutate(formData);
  };

  const composerClass = classNames("flex flex-col", {
    "contrast-50" : createTweetMutation.isLoading,
  });

  return (
    <div>
      <div className="pt-1 relative ">
        {createTweetMutation.isLoading && (
          <div className="absolute z-10 flex w-full h-full items-center justify-center">
            <LoadingIcon />
          </div>
        )}
        <div className={composerClass}>
          <div className="flex  flex-row w-full h-fit">
            <div className="w-14 h-14 pt-1">
              <Avatar
                avatar={reduxUser.user.avatar!}
                username={reduxUser.user.username!}
              />
            </div>

            <div className="flex flex-col w-full pt-1">
              {(tweetText.length > 0 ||
                ComposerSettings.mediaFiles.length > 0 ||
                pollSettings.showPoll ||
                tenorGif) &&
                composerMode !== "reply" && (
                  <ComposerComp.ChooseAudience
                    ComposerSettings={ComposerSettings}
                  />
                )}

              <ComposerComp.TextArea
                tweetText={tweetText}
                setTweetText={setTweetText}
                composerMode={composerMode}
              />

              <MediaCard
                ComposerSettings={ComposerSettings}
                setComposerSettings={setComposerSettings}
                tenorGif={tenorGif}
                setTenorGif={setTenorGif}
              />

              {pollSettings.showPoll && (
                <ComposerComp.PollMenu
                  pollSettings={pollSettings}
                  setPollSettings={setPollSettings}
                />
              )}

              {(tweetText.length > 0 ||
                ComposerSettings.mediaFiles.length > 0 ||
                pollSettings.showPoll ||
                tenorGif) &&
                composerMode !== "reply" && (
                  <ComposerComp.ChooseCanReply
                    ComposerSettings={ComposerSettings}
                  />
                )}

              <Toolbar
                composerMode={composerMode}
                ComposerSettings={ComposerSettings}
                setComposerSettings={setComposerSettings}
                pollSettings={pollSettings}
                setPollSettings={setPollSettings}
                tweetText={tweetText}
                setTweetText={setTweetText}
                tenorGif={tenorGif}
                setTenorGif={setTenorGif}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetComposer;
