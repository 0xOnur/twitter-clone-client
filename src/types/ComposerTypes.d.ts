export interface IComposer {
  audience: "everyone" | "specificUsers";
  whoCanReply: "everyone" | "following" | "mentioned";
  mediaFiles: {
    file: File;
    url: string;
    type: string;
  }[];
}

export interface IPoll {
  author: string;
  choices: {
    _id: number | string;
    text: string;
    votes: string[];
    percentage?: number;
  }[];
  expiresAt: Date;
  totalVotes?: number;
}
