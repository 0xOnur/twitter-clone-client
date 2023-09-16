import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {useComposerClean} from "@hooks/Composer/useComposerClean";
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

  const [showPoll, setShowPoll] = useState(false);

  const [tweetText, setTweetText] = useState("");
  const [tenorGif, setTenorGif] = useState<TenorImage>();

  const [ComposerSettings, setComposerSettings] = useState<IComposer>({
    audience: "everyone",
    whoCanReply: "everyone",
    mediaFiles: [],
  });

  const [pollSettings, setPollSettings] = useState<IPoll>({
    author: reduxUser.user._id,
    choices: [
      {
        _id: 1,
        text: "",
        votes: []
      },
      {
        _id: 2,
        text: "",
        votes: []
      },
    ],
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
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
        setShowPoll,
        setPollSettings,
      });
      showToast(res?.message || "Tweet created succesfully", "success");
      queryClient.invalidateQueries();
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

    if (showPoll) {
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
                href={`/${reduxUser.user.username!}`}
              />
            </div>

            <div className="flex flex-col w-full pt-1">
              {(tweetText.length > 0 ||
                ComposerSettings.mediaFiles.length > 0 ||
                showPoll ||
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

              {showPoll && (
                <ComposerComp.PollMenu
                  setShowPoll={setShowPoll}
                  pollSettings={pollSettings}
                  setPollSettings={setPollSettings}
                />
              )}

              {(tweetText.length > 0 ||
                ComposerSettings.mediaFiles.length > 0 ||
                showPoll ||
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
                showPoll={showPoll}
                setShowPoll={setShowPoll}
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
