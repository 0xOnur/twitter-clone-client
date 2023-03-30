import React, { useState, useRef, useCallback, ChangeEvent } from "react";
import {
  ImageIcon,
  GIFIcon,
  PollIcon,
  ScheduleIcon,
  AddThreadIcon,
} from "@icons/Icon";
import { Composer } from "@components/index";
import { MiddleSection } from "@components/index";
import Emoji from "./ComposerComp/Emoji";

const TweetComposer = () => {
  const [isWritingTweet, setWiritinTweet] = useState(false);

  const [Audience, setAudience] = useState("Everyone");
  const [whoCanReply, setCanReply] = useState("Everyone");

  const [tweet, setTweet] = useState("");

  const tweetSettings = {
    visible: Audience,
    reply: whoCanReply,
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  Composer.useAutosizeTextArea(textAreaRef, tweet);

  const handleChange = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = evt.target?.value;
      setTweet(value);
    },
    []
  );

  const handleFileUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        console.log(selectedFile);
      }
    },
    []
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      tweet,
      tweetSettings,
    })
  }

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
                {isWritingTweet || tweet.length>0 ? (
                  <Composer.ChooseAudience
                    Audience={Audience}
                    setAudience={setAudience}
                  />
                ): (null)}

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
                      onChange={handleChange}
                      maxLength={280}
                    />
                  </div>
                </div>
                {isWritingTweet || tweet.length>0 ? (
                  <Composer.ChooseCanReply
                    whoCanReply={whoCanReply}
                    setCanReply={setCanReply}
                  />
                ): (null)}
                <div className="flex">
                  <div className="flex justify-between w-full my-3">
                    <div className="w-full flex">

                      <button type="button" className="p-2 hover:bg-primary-extraLight w-fit rounded-full cursor-pointer">
                        <label
                          htmlFor="file-input"
                          className="cursor-pointer w-8 h-8"
                        >
                          <ImageIcon
                            className={
                              "w-5 h-5 text-primary-base fill-current font-bold"
                            }
                          />
                        </label>
                        <input
                          className="hidden"
                          id="file-input"
                          type="file"
                          onChange={handleFileUpload}
                        />
                      </button>

                      <button type="button" className="p-2 hover:bg-primary-extraLight w-fit rounded-full cursor-pointer">
                        <label className="cursor-pointer w-8 h-8">
                          <GIFIcon
                            className={
                              "w-5 h-5 text-primary-base fill-current font-bold"
                            }
                          />
                        </label>
                      </button>
                      
                      <button type="button" className="p-2 hover:bg-primary-extraLight w-fit rounded-full cursor-pointer">
                        <label className="cursor-pointer w-8 h-8">
                          <PollIcon
                            className={
                              "w-5 h-5 text-primary-base fill-current font-bold"
                            }
                          />
                        </label>
                      </button>

                      <Emoji setTweet={setTweet} />

                      <button type="button" className="p-2 hover:bg-primary-extraLight w-fit rounded-full cursor-pointer">
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
                        <button disabled={tweet.length===0} type="submit"
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
