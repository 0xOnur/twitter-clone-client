import React, { useState} from "react";
import { TenorImage } from "gif-picker-react";
import { MiddleSection } from "@components/index";
import { TweetProps } from "@customTypes/TweetTypes"
import MediaCard from "./MediaCard";
import Toolbar from "./Toolbar";

import { ComposerSettings, Poll } from "@customTypes/ComposerTypes"

interface IProps {
  composerMode?: string;
  tweet?: TweetProps;
}

const TweetComposer: React.FC<IProps> = ({ composerMode }) => {

  const [tweetText, setTweetText] = useState("");
  const [tenorGif, setTenorGif] = useState<TenorImage>();

  const [ComposerSettings, setComposerSettings] = useState<ComposerSettings>({
    Audience: "Everyone",
    whoCanReply: "Everyone",
    mediaFiles: [],
  })

  const [pollSettings, setPollSettings] = useState<Poll>({
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
  })



  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {

    const formData = new FormData();
    formData.append("tweet", tweetText);
    formData.append("audience", ComposerSettings.Audience);
    formData.append("whoCanReply", ComposerSettings.whoCanReply);

    // Append media files if they exist
    if (ComposerSettings.mediaFiles.length > 0) {
      ComposerSettings.mediaFiles.forEach((media) => {
        formData.append("mediaFiles", media.file);
      });
    } else if (tenorGif) {
      // If no media files, check for tenorGif
      // Assuming TenorImage has a 'url' property
      formData.append("tenorGif", JSON.stringify(tenorGif));
    }

    console.log({
      tweet: tweetText,
      tenorGif: tenorGif,
      pollSettings: pollSettings,
      Audience: ComposerSettings.Audience,
      whoCanReply: ComposerSettings.whoCanReply,
      mediaFiles: ComposerSettings.mediaFiles,
    })
  };

  return (
    <div>
      <div className="pt-1">
        <div className="px-4">
          <div className="flex  flex-row w-full h-fit">
            <div className="w-14 h-14 mr-2 pt-1">
              <a href="/profile">
                <img
                  src="https://pbs.twimg.com/profile_images/1545489373143224321/M6KIvOIY_400x400.jpg"
                  alt="profile"
                  className="rounded-full w-12 h-12 hover:brightness-90"
                />
              </a>
            </div>
            <div className="flex flex-col w-full pt-1">
                
                {(tweetText.length>0 && composerMode !== "reply" ) && (
                  <MiddleSection.ComposerComp.ChooseAudience
                  ComposerSettings = {ComposerSettings}
                  />
                )}

                <MiddleSection.ComposerComp.TextArea
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
                  <MiddleSection.ComposerComp.PollMenu
                    pollSettings={pollSettings}
                    setPollSettings={setPollSettings}
                  />
                )}

                {(tweetText.length>0 && composerMode !== "reply") && (
                  <MiddleSection.ComposerComp.ChooseCanReply
                    ComposerSettings={ComposerSettings}
                  />
                )}

                <Toolbar
                  composerMode = {composerMode}
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

export default React.memo(TweetComposer);
