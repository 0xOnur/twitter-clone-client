import React, { useState, useRef, useCallback } from "react";
import {
  ImageIcon,
  GIFIcon,
  PollIcon,
  ScheduleIcon,
  AddThreadIcon,
  RemoveItemIcon,
} from "@icons/Icon";
import { Composer } from "@components/index";
import { MiddleSection } from "@components/index";
import Emoji from "./ComposerComp/Emoji";

const TweetComposer = () => {
  const [isWritingTweet, setWiritinTweet] = useState(false);

  const [Audience, setAudience] = useState("Everyone");
  const [whoCanReply, setCanReply] = useState("Everyone");

  const [tweet, setTweet] = useState("");
  const [mediaURLs, setMediaURLs] = useState<{ url: string; type: "image" | "video" }[]>([]);

  console.log(mediaURLs)

  const tweetSettings = {
    visible: Audience,
    reply: whoCanReply,
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  Composer.useAutosizeTextArea(textAreaRef, tweet);

  const handleTweetChange = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = evt.target?.value;
      setTweet(value);
    },
    []
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
  
    if (!files) return;
  
    const mediaFiles = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image") ? "image" : "video",
    }));
  
    setMediaURLs((prevMediaURLs: any) => {
      const imagesCount = prevMediaURLs.filter((media: any) => media.type === "image").length;
      const videoCount = prevMediaURLs.filter((media: any) => media.type === "video").length;
  
      const newImages = mediaFiles.filter((media) => media.type === "image");
      const newVideo = mediaFiles.find((media) => media.type === "video");
  
      const maxImagesAllowed = 4 - imagesCount;
      const imagesToAdd = newImages.slice(0, maxImagesAllowed);
  
      if (videoCount === 0 && imagesCount === 0 && newVideo) {
        return [newVideo];
      }
  
      if (videoCount === 0 && newImages.length > 0) {
        return [...prevMediaURLs, ...imagesToAdd];
      }
  
      return prevMediaURLs;
    });
  };
  
  
  
  const handleDeleteImage = (indexToDelete: number) => {
    setMediaURLs((prevmediaURLs) =>
      prevmediaURLs.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      tweet,
      tweetSettings,
    });
  };

  return (
    <div>
      <div className="py-1">
        <div className="px-4 border-b">
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
                {isWritingTweet || tweet.length > 0 || mediaURLs.length > 0 ? (
                  <Composer.ChooseAudience
                    Audience={Audience}
                    setAudience={setAudience}
                  />
                ) : null}

                <div className="relative flex-grow">
                  <div className="py-3">
                    {/* create textarea for tweet */}
                    <textarea
                      className="focus:outline-none resize-none text-xl block w-full"
                      placeholder="What's happening?"
                      onClick={() => {
                        setWiritinTweet(true);
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
                      mediaURLs.length === 1 || (mediaURLs.length === 2 && mediaURLs[0].type === "video")
                        ? "grid-cols-1"
                        : "grid-cols-2"
                    }`}
                  >
                  {mediaURLs.map((media, index) => (
                    <div key={index} className="relative">
                      {media.type === "image" ? (
                        <img
                          src={media.url}
                          alt={`Selected file ${index + 1}`}
                          className={`w-full rounded-xl object-cover ${
                            mediaURLs.length > 1 ? "h-36" : "h-full"
                          }`}
                        />
                      ) : (
                        <video
                          src={media.url}
                          className={"w-full rounded-xl object-cover h-full"}
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
                  ))}
                </div>



                {isWritingTweet || tweet.length > 0 || mediaURLs.length > 0 ? (
                  <Composer.ChooseCanReply
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
                          mediaURLs.some((media) => media.type === "video") || mediaURLs.length >= 4
                            ? "opacity-50"
                            : "hover:bg-primary-extraLight rounded-full"
                        } ${mediaURLs.every((media) => media.type === "image") && mediaURLs.length < 4 && "cursor-pointer"}`}
                        aria-disabled={mediaURLs.some((media) => media.type === "video") || mediaURLs.length >= 4}
                      >
                        <span className="w-8 h-8">
                          <ImageIcon className="w-5 h-5 text-primary-base font-bold" />
                        </span>
                        <input
                          disabled={mediaURLs.some((media) => media.type === "video") || mediaURLs.length >= 4}
                          className="hidden"
                          id="file-input"
                          type="file"
                          multiple
                          accept="image/*,video/*,.gif"
                          onChange={handleImageChange}
                        />
                      </label>



                      <button
                        type="button"
                        disabled={mediaURLs.length > 0}
                        className={`w-fit p-2 'hover:bg-primary-extraLight  rounded-full' ${
                          mediaURLs.length > 0 && "opacity-50"
                        }`}
                      >
                        <label
                          className={`w-8 h-8 ${
                            mediaURLs.length <= 0 && "cursor-pointer"
                          }`}
                        >
                          <GIFIcon
                            className={
                              "w-5 h-5 text-primary-base fill-current font-bold"
                            }
                          />
                        </label>
                      </button>

                      <button
                        type="button"
                        disabled={mediaURLs.length > 0}
                        className={`w-fit p-2 'hover:bg-primary-extraLight  rounded-full' ${
                          mediaURLs.length > 0 && "opacity-50"
                        }`}
                      >
                        <label
                          className={`w-8 h-8 ${
                            mediaURLs.length <= 0 && "cursor-pointer"
                          }`}
                        >
                          <PollIcon
                            className={
                              "w-5 h-5 text-primary-base fill-current font-bold"
                            }
                          />
                        </label>
                      </button>

                      <Emoji setTweet={setTweet} />

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
                            <MiddleSection.CircleProgressBar
                              value={tweet.length}
                              limit={280}
                            />
                            <div className="w-0.5 mx-3 h-full bg-gray-300"></div>

                            <div className="text-primary-base hover:bg-primary-extraLight border rounded-full p-1 cursor-pointer">
                              <AddThreadIcon className={"w-4 h-4"} />
                            </div>
                          </>
                        )}
                        <button
                          disabled={tweet.length === 0 && mediaURLs.length===0}
                          type="submit"
                          className="border h-full px-3 ml-3 rounded-full bg-primary-base hover:bg-primary-dark text-white font-bold"
                        >
                          Tweet
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
