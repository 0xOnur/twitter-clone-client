import React, { useState, useRef, useCallback, useEffect } from "react";
import { TenorImage } from "gif-picker-react";
import {
  ImageIcon,
  PollIcon,
  ScheduleIcon,
  AddThreadIcon,
  RemoveItemIcon,
} from "@icons/Icon";
import { MiddleSection } from "@components/index";
import { TweetsProps } from "../Tweet";

interface IProps {
  composerMode?: string;
  tweet?: TweetsProps;
}

const TweetComposer: React.FC<IProps> = ({ composerMode }) => {
  const [isWritingTweet, setWiritingTweet] = useState(false);

  const [Audience, setAudience] = useState("Everyone");
  const [whoCanReply, setCanReply] = useState("Everyone");

  const [tweet, setTweet] = useState("");

  const [mediaFiles, setMediaFiles] = useState<
    Array<{ file: File; url: string; type: string }>
  >([]);
  const [mediaAveilable, setMediaAveilable] = useState(true);

  const [tenorGif, setTenorGif] = useState<TenorImage | undefined>();
  const [gifAvailable, setGifAveilable] = useState(true);

  const [choices, setChoices] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
  ]);
  const [pollLength, setPollLength] = useState({
    days: 1,
    hours: 0,
    minutes: 0,
  });
  const [showPoll, setShowPoll] = useState(false);

  useEffect(() => {
    mediaFiles.length > 0 || tenorGif || showPoll
      ? setGifAveilable(false)
      : setGifAveilable(true);
    mediaFiles.length >= 4 || tenorGif || showPoll
      ? setMediaAveilable(false)
      : setMediaAveilable(true);
    showPoll || mediaFiles.length > 0 || tweet.length > 0 || tenorGif
      ? setWiritingTweet(true)
      : setWiritingTweet(false);

    mediaFiles.forEach((media) => {
      if (media.type === "video") {
        setMediaAveilable(false);
      }
    });
  }, [mediaFiles, tenorGif, showPoll, tweet]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  MiddleSection.ComposerComp.useAutosizeTextArea(textAreaRef, tweet);

  const handleTweetChange = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = evt.target?.value;
      setTweet(value);
    },[]
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) return;

    const mediaFiles = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image") ? "image" : "video",
    }));

    setMediaFiles((prevMediaFiles) => {
      const imagesCount = prevMediaFiles.filter(
        (media) => media.type === "image"
      ).length;
      const videoCount = prevMediaFiles.filter(
        (media) => media.type === "video"
      ).length;

      const newImages = mediaFiles.filter((media) => media.type === "image");
      const newVideo = mediaFiles.find((media) => media.type === "video");

      const maxImagesAllowed = 4 - imagesCount;
      const imagesToAdd = newImages.slice(0, maxImagesAllowed);

      if (videoCount === 0 && imagesCount === 0 && newVideo) {
        return [newVideo];
      }

      if (videoCount === 0 && newImages.length > 0) {
        return [...prevMediaFiles, ...imagesToAdd];
      }

      return prevMediaFiles;
    });
  
  };

  const handleDeleteImage = (indexToDelete: number) => {
    setMediaFiles((prevmediaURLs) =>
      prevmediaURLs.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tweet", tweet);
    formData.append("audience", Audience);
    formData.append("whoCanReply", whoCanReply);

    // Append media files if they exist
    if (mediaFiles.length > 0) {
      mediaFiles.forEach((media) => {
        formData.append("mediaFiles", media.file);
      });
    } else if (tenorGif) {
      // If no media files, check for tenorGif
      // Assuming TenorImage has a 'url' property
      formData.append("tenorGif", JSON.stringify(tenorGif.url));
    }
    
  };

  console.log({
    tweet,
    Audience,
    whoCanReply,
    mediaFiles,
    tenorGif: tenorGif,
  })

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
              <form onSubmit={handleSubmit} className="flex flex-col">
                {isWritingTweet && composerMode !== "reply" ? (
                  <MiddleSection.ComposerComp.ChooseAudience
                    Audience={Audience}
                    setAudience={setAudience}
                  />
                ) : null}

                <div className="relative flex-grow">
                  <div className="py-3">
                    {/* create textarea for tweet */}
                    <textarea
                      className="focus:outline-none resize-none text-xl block w-full bg-transparent"
                      placeholder={
                        composerMode === "reply"
                          ? "Tweet your reply"
                          : composerMode === "retweet"
                          ? "Add a comment"
                          : "What's happening?"
                      }
                      onClick={() => {
                        setWiritingTweet(true);
                      }}
                      ref={textAreaRef}
                      value={tweet}
                      onChange={handleTweetChange}
                      maxLength={280}
                    />
                  </div>
                </div>

                <div
                  className={`grid gap-2 mb-1 ${
                    mediaFiles.length === 1 ||
                    (mediaFiles.length === 2 &&
                      mediaFiles[0].type === "video") ||
                    tenorGif
                      ? "grid-cols-1"
                      : "grid-cols-2"
                  }`}
                >
                  {mediaFiles.length > 0
                    ? mediaFiles.map((media, index) => (
                        <div key={index} className="relative">
                          {media.type === "image" || media.type === "gif" ? (
                            <img
                              src={media.url}
                              alt={`Selected file ${index + 1}`}
                              className={`w-full rounded-xl object-cover ${
                                mediaFiles.length > 1 ? "h-36" : "h-full"
                              }`}
                            />
                          ) : (
                            <video
                              src={media.url}
                              className={
                                "w-full rounded-xl object-cover h-full"
                              }
                              controls
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(index)}
                            className="absolute left-2 top-2 bg-gray-900 hover:bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center"
                          >
                            <RemoveItemIcon className={"w-5 h-5"} />
                          </button>
                        </div>
                      ))
                    : tenorGif && (
                        <div className="relative">
                          <img
                            src={tenorGif?.preview.url}
                            alt={`${tenorGif?.description}`}
                            className="w-full rounded-xl object-cover h-full"
                          />

                          <button
                            type="button"
                            onClick={() => setTenorGif(undefined)}
                            className="absolute left-2 top-2 bg-gray-900 hover:bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center"
                          >
                            <RemoveItemIcon className={"w-5 h-5"} />
                          </button>
                        </div>
                      )}
                </div>

                {showPoll && (
                  <MiddleSection.ComposerComp.PollMenu
                    setShowPoll={setShowPoll}
                    choices={choices}
                    setChoices={setChoices}
                    pollLength={pollLength}
                    setPollLength={setPollLength}
                  />
                )}

                {isWritingTweet && composerMode !== "reply" ? (
                  <MiddleSection.ComposerComp.ChooseCanReply
                    whoCanReply={whoCanReply}
                    setCanReply={setCanReply}
                  />
                ) : null}

                <div className="flex">
                  <div className="flex justify-between w-full my-3">
                    <div className="w-full flex">
                      <label
                        htmlFor="file-input"
                        className={`w-fit p-2 ${
                          mediaAveilable
                            ? "hover:bg-primary-extraLight rounded-full cursor-pointer"
                            : "opacity-50"
                        }`}
                      >
                        <span className="w-8 h-8">
                          <ImageIcon className="w-5 h-5 text-primary-base font-bold" />
                        </span>
                        <input
                          disabled={!mediaAveilable}
                          className="hidden"
                          id="file-input"
                          type="file"
                          multiple
                          accept="image/*,video/*,.gif"
                          onChange={handleImageChange}
                        />
                      </label>

                      <MiddleSection.ComposerComp.GIFMenu
                        tenorGif={tenorGif}
                        setTenorGif={setTenorGif}
                        gifAvailable={gifAvailable}
                      />

                      <button
                        type="button"
                        disabled={!gifAvailable || !mediaAveilable}
                        onClick={() => setShowPoll(true)}
                        className={`w-fit p-2 ${
                          mediaFiles.length > 0 || !gifAvailable
                            ? "opacity-50"
                            : "hover:bg-primary-extraLight rounded-full"
                        }`}
                      >
                        <label
                          className={`w-8 h-8 ${
                            mediaFiles.length === 0 && gifAvailable
                              ? "cursor-pointer"
                              : ""
                          }`}
                        >
                          <PollIcon
                            className={
                              "w-5 h-5 text-primary-base fill-current font-bold"
                            }
                          />
                        </label>
                      </button>

                      <MiddleSection.ComposerComp.Emoji setTweet={setTweet} />

                      <button
                        type="button"
                        className="p-2 hover:bg-primary-extraLight w-fit rounded-full cursor-pointer"
                      >
                        <label className="cursor-pointer w-8 h-8">
                          <ScheduleIcon
                            className={"w-5 h-5 text-primary-base fill-current"}
                          />
                        </label>
                      </button>
                    </div>

                    <div className="w-full h-full text-right">
                      <div className="flex h-full justify-end items-center">
                        {tweet.length > 0 && (
                          <>
                            <MiddleSection.ComposerComp.CircleProgressBar
                              value={tweet.length}
                              limit={280}
                            />
                            {composerMode === "reply" ? null : (
                              <>
                                <div className="w-0.5 mx-3 h-full bg-gray-300"></div>
                                <div className="text-primary-base hover:bg-primary-extraLight border rounded-full p-1 cursor-pointer">
                                  <AddThreadIcon className={"w-4 h-4"} />
                                </div>
                              </>
                            )}
                          </>
                        )}
                        <button
                          disabled={
                            tweet.length === 0 && mediaFiles.length === 0
                          }
                          type="submit"
                          className={`border h-full px-3 ml-3 rounded-full bg-primary-base hover:bg-primary-dark text-white font-bold
                                      ${tweet.length === 0 &&
                              mediaFiles.length === 0
                              ? "opacity-60"
                              : ""
                            }`}
                        >
                          {composerMode === "reply" ? "Reply" : "Tweet"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TweetComposer);
