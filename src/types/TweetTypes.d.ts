export interface TweetProps {
  _id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  audience?: string;
  whoCanReply?: string
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
  quoteTweets? : [
    {
      _id: string;
    }
  ];
  likes?: [
    {
      _id: string;
      userId: string;
      username: string;
      avatar: string;
      bio: string;
    }
  ];
  bookmarks? : [
    {
      _id: string;
    }
  ];
  view: number;
  createdAt: Date;
}
