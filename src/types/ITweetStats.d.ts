interface ITweetStats {
  replyStats: {
    _id: string;
    author: string;
  }[];
  retweetStats: {
    _id: string;
    author: string;
  }[];
  likeStats: {
    _id: string;
    author: string;
  }[];
  quoteStats: {
    _id: string;
    author: string;
  }[];
}
