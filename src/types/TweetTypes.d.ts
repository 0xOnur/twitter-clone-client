export interface TweetProps {
  _id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  media?: {
      url: string;
      alt: string;
      type: string;
    }[];
  comments?: [
    {
      _id: string;
      userId: string;
      username: string;
      comment: string;
      createdAt: Date;
    }
  ];
  retweets?: [
    {
      _id: string;
      userId: string;
      username: string;
      avatar: string;
      bio: string;
    }
  ];
  quoteTweets? : TweetProps;
  likes?: [
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
