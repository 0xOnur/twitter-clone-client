import { IComposer, IPoll } from "@customTypes/ComposerTypes";
import { TenorImage } from "gif-picker-react";

interface IProps {
  setTweetText: React.Dispatch<React.SetStateAction<string>>;
  setTenorGif: React.Dispatch<React.SetStateAction<TenorImage | undefined>>;
  setComposerSettings: React.Dispatch<React.SetStateAction<IComposer>>;
  setPollSettings: React.Dispatch<React.SetStateAction<IPoll>>;
}

export const useComposerClean = () => {
  const cleanComposer = ({
    setTweetText,
    setTenorGif,
    setComposerSettings,
    setPollSettings,
  }: IProps) => {
    setTweetText("");
    setTenorGif(undefined);
    setComposerSettings({
      audience: "everyone",
      whoCanReply: "everyone",
      mediaFiles: [],
    });
    setPollSettings({
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
      duration: {
        days: 1,
        hours: 0,
        minutes: 0,
      },
      showPoll: false,
    });
  };
  return { cleanComposer };
};
