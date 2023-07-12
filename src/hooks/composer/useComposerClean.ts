import { IComposer, IPoll } from "@customTypes/ComposerTypes";
import { TenorImage } from "gif-picker-react";

interface IProps {
  setTweetText: React.Dispatch<React.SetStateAction<string>>;
  setTenorGif: React.Dispatch<React.SetStateAction<TenorImage | undefined>>;
  setComposerSettings: React.Dispatch<React.SetStateAction<IComposer>>;
  setShowPoll: React.Dispatch<React.SetStateAction<boolean>>;
  setPollSettings: React.Dispatch<React.SetStateAction<IPoll>>;
}

export const useComposerClean = () => {
  const cleanComposer = ({
    setTweetText,
    setTenorGif,
    setComposerSettings,
    setShowPoll,
    setPollSettings,
  }: IProps) => {
    setTweetText("");
    setTenorGif(undefined);
    setComposerSettings({
      audience: "everyone",
      whoCanReply: "everyone",
      mediaFiles: [],
    });
    setShowPoll(false);
    setPollSettings({
      author: "",
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
  };
  return { cleanComposer };
};
