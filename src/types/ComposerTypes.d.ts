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
    choices: {
      id: number;
      text: string;
    }[];
    duration: {
      days: number;
      hours: number;
      minutes: number;
    };
    showPoll: boolean;
  }
  