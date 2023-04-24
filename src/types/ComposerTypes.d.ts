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
    pollTimer: {
        days: number;
        hours: number;
        minutes: number;
    };
    choices: {
        id: number;
        text: string;
    }[];
    showPoll: boolean;
}