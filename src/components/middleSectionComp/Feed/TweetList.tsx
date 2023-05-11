import React, { useState } from "react";
import {TweetCardComp} from "@components/index";
import {IUser, ITweet} from "@customTypes/index"

interface IProps {
  isAuthenticated: boolean;
}


const TweetList = ({isAuthenticated}:IProps) => {
  // const [user, setUser] = useState<IUser>({} as IUser);

  const initialUser: IUser = {
    _id: "60e1c7b0b0b5a40015b0b0b0",
    displayName: "onur",
    username: "0xZero",
    isVerified: true,
    avatar: "https://pbs.twimg.com/profile_images/1504849693452427265/08B4ILCz_400x400.jpg",
    email: "onurabat3@gmail.com",
    createdAt: "2023-04-01T15:30:00.000Z",
  };

  const [user, setUser] = useState<IUser>(initialUser);

  const [tweets, setTweets] = useState<ITweet[]>([
    {
      _id: "60e1c7b0b0b5a40015b0b0b0",
      author: user,
      audience: "everyone",
      whoCanReply: "everyone",
      content: "Im new here :)",
      tweetType: "retweet",
      media: [
      
        {
          "url": "https://image.lexica.art/full_jpg/a7b048f4-e1f9-43f4-8f40-f6f91bb9ee97",
          "alt": "Portrait of a queen with long marsala color braided hair",
          "type": "image"
        },
        {
          "url": "https://image.lexica.art/full_jpg/21013189-6dee-4921-9578-6319626f4793",
          "alt": "Jennifer lawrence, black metal girl makeup, realistic detailed",
          "type": "image"
        },
        {
          "url": "https://image.lexica.art/full_jpg/8de701f4-d4b0-4948-929f-39b5f6c62688",
          "alt": "Mason jar overflowing with coins with transparent background",
          "type": "image"
        }
      ],
      retweets: [
        user,
      ],
      replyTweets: [
        {
          _id: "60e1c7b0b0b5a40015b0b0b0",
          author: {
            _id: "60e1c7b0b0b5a40015b0b0b0",
            displayName: "ahbap",
            username: "ahbap",
          },
          audience: "everyone",
          whoCanReply: "everyone",
          tweetType: "tweet",
          content: "Im new here :)",
          view: 3800,
          createdAt: "2023-04-01T15:30:00.000Z",
        },
      ],
      likes: [
        user,
      ],
      bookmarks: [
        user,
      ],


      view: 3800,
      createdAt: "2023-04-01T15:30:00.000Z",
      updatedAt: "2023-04-01T15:30:00.000Z",
    },
  ]);

  return (
    <div>
      {
        tweets.map((tweet) => (
          <TweetCardComp.TweetCard key={tweet._id} tweet={tweet} pageType="home" isAuthenticated={isAuthenticated} />
        ))
      }
    </div>
  );
};

export default TweetList;
