import useCreateTweetMutation from "@hooks/Tweet/Mutations/useCreateTweetMutation";
import { ComposerState } from "@redux/slices/composerSlice";
import classNames from "classnames";
import React from "react";

interface IProps {
  composer: ComposerState;
  composerMode: "tweet" | "reply" | "quote";
  originalTweet: ITweet | undefined;
  onClose?: () => void;
}

const SubmiButton = ({ composer, composerMode, originalTweet, onClose }: IProps) => {
  const { mutate } = useCreateTweetMutation();

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    const formData = new FormData();

    formData.append("audience", composer.settings.audience);
    formData.append("whoCanReply", composer.settings.whoCanReply);
    formData.append("tweetType", composerMode);

    composer.tweetText.length > 0 &&
      formData.append("content", composer.tweetText);

    if (originalTweet) {
      formData.append("originalTweet", originalTweet._id);
    }

    if (composer.tenorGif) {
      const tenorMedia = [
        {
          url: composer.tenorGif.url,
          type: "gif",
          alt: composer.tenorGif.description,
        },
      ];
      formData.append("tenorMedia", JSON.stringify(tenorMedia));
    }

    if (composer.showPoll) {
      formData.append("poll", JSON.stringify(composer.poll));
    }

    if (composer.mediaFiles.length > 0) {
      composer.mediaFiles.forEach((file) => {
        formData.append("mediaFiles", file.file);
        formData.append("mediaType", file.type);
      });
    }
    mutate(formData);
    onClose && onClose();
  };

  const tweetButtonClasses = classNames(
    "border h-full px-3 rounded-full bg-primary-base text-white font-bold",
    {
      "hover:bg-primary-dark":
        composer.mediaFiles.length > 0 || composer.tweetText.length > 0,
      "opacity-50":
        composer.tweetText.length === 0 &&
        composer.mediaFiles.length === 0 &&
        !composer.tenorGif,
    }
  );

  return (
    <button
      disabled={
        composer.mediaFiles.length === 0 &&
        composer.tweetText.length === 0 &&
        !composer.tenorGif
      }
      type="submit"
      className={tweetButtonClasses}
      onClick={handleSubmit}
    >
      {composerMode === "reply" ? "Reply" : "Tweet"}
    </button>
  );
};

export default SubmiButton;
