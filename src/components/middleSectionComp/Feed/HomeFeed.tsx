import React, { useState } from "react";
import { HeaderComp } from "@components/middleSectionComp";
import TweetList from "./TweetList";
import { TweetComposer } from "../ComposerComp";

const HomeFeed: React.FC = () => {
  const [isForYou, setIsForYou] = useState(false);

  return (
    <div className="container max-w-2xl border-x min-w-min">
      <HeaderComp.Header
        pageType="home"
        isForYou={isForYou}
        setIsForYou={setIsForYou}
      />
      {/* There is after header section for create twitter and something */}
      <div className="px-4">
        <TweetComposer composerMode="tweet" />
      </div>
      {/* There is  */}
      <TweetList />
    </div>
  );
};
export default HomeFeed;
