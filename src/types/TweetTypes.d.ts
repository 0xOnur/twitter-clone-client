export interface TweetProps {
  _id: string;
  owner: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  media?: [
    {
      url: string;
      alt: string;
      type: string;
    }
  ];
  comments?: [
    {
      _id: string;
      userId: string;
      username: string;
      content: string;
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
