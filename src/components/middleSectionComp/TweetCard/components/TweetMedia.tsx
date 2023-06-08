import { useState } from "react";
import classNames from "classnames";
import { ITweet } from "@customTypes/TweetTypes";
import { MediaModal } from "@components/middleSectionComp/DialogModals";

type Props = {
  tweet: ITweet;
};

const TweetMedia = ({ tweet }: Props) => {
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const mediaGridClasses = classNames("grid gap-0.5 ", {
    "grid-cols-1": tweet?.media!.length <= 1,
    "grid-cols-2": tweet?.media!.length > 1,
  });

  const gridItemClasses = (index: number) =>
    classNames({
      "row-span-2 h-full": tweet?.media!.length === 3 && index === 0,
    });

  const imageClasses = (index: number) =>
    classNames("w-full object-cover cursor-pointer", {
      "h-full rounded-tl-xl rounded-bl-xl":
        tweet.media?.length === 3 && index === 0,
      "h-56":
        tweet?.media!.length > 3 || index !== 0 || tweet.media!.length === 2,

      "rounded-xl": tweet?.media?.length === 1,

      "rounded-tl-xl rounded-bl-xl": tweet?.media!.length === 2 && index === 0,
      "rounded-tr-xl rounded-br-xl": tweet?.media!.length === 2 && index === 1,

      "rounded-tl-xl": (tweet?.media!.length === 3 || 4) && index === 0,
      "rounded-tr-xl": (tweet?.media!.length === 3 || 4) && index === 1,
      "rounded-br-xl":
        (tweet?.media!.length === 3 && index === 2) ||
        (tweet?.media!.length === 4 && index === 3),
      "rounded-bl-xl": tweet?.media!.length === 4 && index === 2,
    });

  return (
    <div className="mt-3 mb-2 z-10">
      <div className={mediaGridClasses}>
        {tweet.media &&
          tweet.media.map((media, index) => (
            <div key={index} className={gridItemClasses(index)}>
              {media.type === "image" || media.type === "gif" ? (
                <div key={index} className={"h-full"}>
                  <img
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMediaModal(true);
                      setCurrentImageIndex(index);
                    }}
                    src={media.url}
                    alt={media.alt}
                    className={imageClasses(index)}
                  />
                </div>
              ) : (
                <div onClick={(e) => e.stopPropagation()}>
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
      {showMediaModal && (
        <MediaModal
          isOpen={showMediaModal}
          onClose={() => setShowMediaModal(false)}
          images={
            tweet.media?.map((media) => ({ url: media.url, alt: media?.alt }))!
          }
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
        />
      )}
    </div>
  );
};

export default TweetMedia;
