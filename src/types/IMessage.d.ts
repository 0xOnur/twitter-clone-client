interface IMessage {
    _id?: string;
    chat: IChat | string;
    sender?: IUser & string;
    content: string;
    readBy?: IUser[] & string;
    createdAt?: string;
    updatedAt?: string;
    type?: "message" | "reply" | "tweet";
    tweet: string;
    replyTo?: IMessage | string;
}