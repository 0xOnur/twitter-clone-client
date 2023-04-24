import React from "react";
import { ITweet } from "@customTypes/TweetTypes";
import classNames from "classnames";

type Props = {
  tweet: ITweet;
};

const TweetMedia = ({ tweet }: Props) => {
  
    const mediaGridClasses = classNames("grid gap-0.5 ", {
    "grid-cols-1": tweet?.media!.length <= 1,
    "grid-cols-2": tweet?.media!.length > 1,
  });

  const gridItemClasses = (index: number) =>
    classNames({
      "row-span-2 h-full": tweet?.media!.length === 3 && index === 0,
    });

  const imageClasses = (index: number) =>
    classNames("w-full object-cover", {
      "h-full rounded-tl-xl rounded-bl-xl":  tweet.media?.length === 3 && index === 0,
      "h-56": (tweet?.media!.length > 3 || index !== 0) || tweet.media!.length === 2,
      
      "rounded-xl": tweet?.media?.length === 1,
      
      "rounded-tl-xl rounded-bl-xl": tweet?.media!.length === 2 && index === 0,
      "rounded-tr-xl rounded-br-xl": tweet?.media!.length === 2 && index === 1,

      "rounded-tl-xl": (tweet?.media!.length === 3 || 4) && index === 0,
      "rounded-tr-xl": (tweet?.media!.length === 3 || 4) && index === 1,
      "rounded-br-xl": (tweet?.media!.length === 3 && index === 2) || (tweet?.media!.length === 4 && index === 3),
      "rounded-bl-xl": tweet?.media!.length === 4 && index === 2,
    });

  return (
    <div className="mt-3">
      <div className={mediaGridClasses}>
        {tweet.media &&
          tweet.media.map((media, index) => (
            <div key={index} className={gridItemClasses(index)}>
              {media.type === "image" || media.type === "gif" ? (
                <div key={index} className={"h-full"} onClick={(e)=> (e.stopPropagation())}>
                  <img
                    src={media.url}
                    alt={media.alt}
                    className={imageClasses(index)}
                    
                  />
                </div>
              ) : (
                <div onClick={(e)=> (e.stopPropagation())}>
                  <video
                    src={media.url}
                    className="w-full rounded-xl object-cover overflow-hidden rounded-bl-xl"
                    controls
                  />
                </div>
                
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TweetMedia;
