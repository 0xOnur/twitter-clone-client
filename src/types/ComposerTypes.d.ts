export interface ComposerSettings {
    Audience: string;
    whoCanReply: string;
    mediaFiles: {
        file: File;
        url: string;
        type: string;
    }[];
}

export interface Poll {
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