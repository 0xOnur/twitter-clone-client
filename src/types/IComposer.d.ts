interface IComposer {
  audience: "everyone" | "specificUsers";
  whoCanReply: "everyone" | "following" | "mentioned";
  mediaFiles: {
    file: File;
    url: string;
    type: string;
  }[];
}