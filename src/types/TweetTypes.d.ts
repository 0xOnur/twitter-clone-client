import {IUser} from "./UserTypes"

export interface Media {
  url: string;
  alt: string;
  type: "image/jpeg" |  
  "image/png" |
  "image/jpg" |
  "image/gif" |
  "video/mp4";
}

export interface ITweet {
  _id: string;
  author: IUser;
  audience: "everyone" | "followers" | "specificUsers";
  specificAudience?: IUser[];
  whoCanReply: "everyone" | "following" | "mentioned";
  content?: string;
  media?: Media[];
  bookmarks?: string[];
  originalTweet?: string;
  tweetType: "tweet" | "reply" | "retweet" | "like" | "quote";
  view: number;
  createdAt: string; // Assuming date is received as a string (e.g., ISO 8601 format)
  updatedAt?: string; // Assuming date is received as a string (e.g., ISO 8601 format)
}