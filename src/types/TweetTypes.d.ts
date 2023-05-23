import {IUser} from "./UserTypes"

export interface Media {
  url: string;
  alt: string;
  type: "image" | "gif" | "video";
}

export interface ITweet {
  _id: string;
  author: IUser;
  audience: "everyone" | "followers" | "specificUsers";
  specificAudience?: IUser[];
  whoCanReply: "everyone" | "following" | "mentioned";
  content?: string;
  media?: Media[];
  replyCount?: number;
  retweetCount?: number;
  quoteCount?: number;
  likes?: string[];
  bookmarks?: string[];
  originalTweet?: ITweet;
  tweetType: "tweet" | "reply" | "retweet" | "quote";
  view: number;
  createdAt: string; // Assuming date is received as a string (e.g., ISO 8601 format)
  updatedAt?: string; // Assuming date is received as a string (e.g., ISO 8601 format)
}