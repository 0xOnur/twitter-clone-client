interface IMessage {
    _id?: string;
    chat: IChat | string;
    sender?: IUser;
    content: string;
    readBy?: IUser[];
    createdAt?: string;
    updatedAt?: string;
    type?: "message" | "reply" | "tweet";
    replyTo?: IMessage | string;
}