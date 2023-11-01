import { HeaderComp } from "@components/middleSectionComp";
import { TweetComposer } from "../ComposerComp";
import FollowingFeed from "./FollowingFeed";
import { useState, useEffect } from "react";
import ForYouFeed from "./ForYouFeed";

interface IProps {
  isAuthenticated: boolean;
}

const HomeFeed = ({ isAuthenticated }: IProps) => {
  const localIsForYou = localStorage.getItem("isForYou");
  const [isForYou, setIsForYou] = useState(
    localIsForYou !== null && isAuthenticated ? JSON.parse(localIsForYou) : true
  );

  useEffect(() => {
    localStorage.setItem("isForYou", JSON.stringify(isForYou));
  }, [isForYou]);

  return (
    <div className="container max-w-600px border-x-2 border-[color:var(--background-third)]">
      <HeaderComp.Header
        pageType="Home"
        isForYou={isForYou}
        setIsForYou={setIsForYou}
      />

      {isAuthenticated && (
        <div className="mx-4">
          <TweetComposer composerMode="tweet" />
          <div className="-mx-4 h-0.5 bg-[color:var(--background-third)]" />
        </div>
      )}

      {isForYou && <ForYouFeed isAuthenticated={isAuthenticated} />}

      {!isForYou && isAuthenticated && (
        <FollowingFeed isAuthenticated={isAuthenticated} />
      )}
    </div>
  );
};
export default HomeFeed;
