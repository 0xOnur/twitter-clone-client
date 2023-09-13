interface IMessage {
    _id?: string;
    chat: IChat | string;
    sender?: IUser;
    content: string;
    readBy?: IUser[];
    createdAt?: string;
    updatedAt?: string;
    type?: "message" | "reply" | "tweet";
    tweet: ITweet | string;
    replyTo?: IMessage | string;
}