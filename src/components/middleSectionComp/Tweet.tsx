import React, { useState } from "react";
import {MiddleSection} from "@components/index";


type User = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  location: string;
  website: string;
  followers: [
    {
      id: string;
    }
  ];
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
}




export type TweetsProps = {
  _id: string;
  owner: {
    id: string;
    name: string
    username: string;
    avatar: string
  };
  content: string;
  images: [
    {
      url: string;
      alt: string;
    }
  ];
  comments: [
    {
      _id: string;
      userId: string;
      username: string;
      content: string;
      createdAt: Date;
    }
  ];
  retweets: [
    {
      _id: string;
      userId: string;
      username: string;
      avatar: string;
      bio: string;
    }
  ];
  likes: [
    {
      _id: string;
      userId: string;
      username: string;
      avatar: string;
      bio: string;
    }
  ];
  view: number;
  createdAt: Date;
}

const Tweet = () => {

  const [tweets, setTweets] = useState<TweetsProps[]>([
    {
      "_id": "60a3d5a3a942a21a487e7f25",
      "owner": {
        "id": "60a2c1b2a942a21a487e7f20",
        "name": "John Doe",
        "username": "uniquser",
        "avatar": "https://pbs.twimg.com/profile_images/1545489373143224321/M6KIvOIY_400x400.jpg"
      },
      "content": "Hello World!",
      "images": [
        {
          "url": "https://example.com/image.jpg",
          "alt": "Image description"
        }
      ],
      "comments": [
        {
          "_id": "60a3d5a3a942a21a487e7f26",
          "userId": "60a2c1b2a942a21a487e7f21",
          "username": "commenting_user",
          "content": "",
          "createdAt": new Date("2023-04-11T10:55:00.000Z")
        }
      ],
      "retweets": [
        {
          "_id": "60a3d5a3a942a21a487e7f27",
          "userId": "60a2c1b2a942a21a487e7f22",
          "username": "retweeting_user",
          "avatar": "https://example.com/avatar.jpg",
          "bio": "Hi, I am the retweeting user.",
        }
      ],
      "likes": [
        {
          "_id": "60a3d5a3a942a21a487e7f28",
          "userId": "60a2c1b2a942a21a487e7f23",
          "username": "liking_user",
          "avatar": "https://example.com/avatar.jpg",
          "bio": "Hi, I am the liking user.",
        }
      ],
      "view": 1200,
      "createdAt": new Date("2023-04-12T10:45:00.000Z")
    },

  ]);

  return (
    <>
      {
        tweets.map((tweet) => (
          <MiddleSection.TweetCardComp.TweetCard key={tweet._id} tweet={tweet} />
        ))
      }
    </>
  );
};

export default Tweet;
