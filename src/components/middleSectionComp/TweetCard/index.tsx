import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSpecificTweetStats } from "api/tweetApi";
import { ITweet } from "@customTypes/TweetTypes";
import BasicCard from "./BasicCard";
import DetailedCard from "./DetailedCard";

interface IProps {
  pageType: "home" | "TweetDetails";
  tweet: ITweet;
  quoteCount?: number;
  isAuthenticated: boolean;
}

const TweetCard = ({ pageType, tweet, isAuthenticated }: IProps) => {
  const [showReplyModal, setReplyModal] = useState(false);
  const [showQuoteModal, setQuoteModal] = useState(false);
  const [composerMode, setComposerMode] = useState<"reply" | "quote">("reply");

  const tweetStatsQuery = useQuery({
    queryKey: ["tweetStats", tweet._id],
    queryFn: () => getSpecificTweetStats(tweet._id),
  });

  switch (pageType) {
    case "home":
      return (
        <BasicCard
          isAuthenticated={isAuthenticated}
          tweet={tweet}
          tweetStats={tweetStatsQuery?.data}
          showQuoteModal={showQuoteModal}
          showReplyModal={showReplyModal}
          setShowReply={setReplyModal}
          setQuoteModal={setQuoteModal}
          setComposerMode={setComposerMode}
        />
      );
    case "TweetDetails":
      return <DetailedCard
            isAuthenticated={isAuthenticated}
            tweet={tweet}
            tweetStats={tweetStatsQuery?.data}
            showQuoteModal={showQuoteModal}
            showReplyModal={showReplyModal}
            setReplyModal={setReplyModal}
            setQuoteModal={setQuoteModal}
            composerMode={composerMode}
            setComposerMode={setComposerMode}
        />;
    default:
      return null;
  }
};

export default TweetCard;
