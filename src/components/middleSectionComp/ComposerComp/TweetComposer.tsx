import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@redux/config/store";
import { TenorImage } from "gif-picker-react";
import { ComposerComp } from "@components/index";
import { ITweet } from "@customTypes/TweetTypes";
import { IComposer, IPoll } from "@customTypes/index";
import MediaCard from "./ComposerMedia";
import Toolbar from "./Toolbar";
import { Avatar } from "@components/middleSectionComp/TweetCard/components";


type IProps = {
  composerMode: "tweet"| "reply" | "quote"
  originalTweet?: ITweet;
};

const TweetComposer = ({ composerMode, originalTweet }: IProps) => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const [tweetText, setTweetText] = useState("");
  const [tenorGif, setTenorGif] = useState<TenorImage>();

  const [ComposerSettings, setComposerSettings] = useState<IComposer>({
    audience: "everyone",
    whoCanReply: "everyone",
    mediaFiles: [],
  });

  const [pollSettings, setPollSettings] = useState<IPoll>({
    pollTimer: {
      days: 1,
      hours: 0,
      minutes: 0,
    },
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
    showPoll: false,
  });

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    const formData = new FormData();
    formData.append("tweet", tweetText);

    if (tenorGif) {
      formData.append("url", JSON.stringify(tenorGif));
    }

    if (pollSettings.showPoll) {
      formData.append("poll", JSON.stringify(pollSettings));
    }

    if (ComposerSettings.mediaFiles.length > 0) {
      ComposerSettings.mediaFiles.forEach((mediaFile, index) => {
        formData.append(`mediaFile${index}`, mediaFile.file);
      });
    }

    formData.append("audience", ComposerSettings.audience);
    formData.append("whoCanReply", ComposerSettings.whoCanReply);

    console.log({
      author: reduxUser.user._id,
      originalTweetId: originalTweet?._id,
      composerMode: composerMode,
      tweetText: tweetText,
      tenorGif: tenorGif,
      pollSettings: pollSettings,
      mediaFiles: ComposerSettings.mediaFiles,
      audience: ComposerSettings.audience,
      whoCanReply: ComposerSettings.whoCanReply,
    });
  };

  return (
    <div>
      <div className="pt-1">
        <div className="flex flex-col">
          <div className="flex  flex-row w-full h-fit">
            
            <div className="w-14 h-14 pt-1">
              <Avatar
                avatar= {reduxUser.user.avatar!}
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
