interface IMessage {
    _id: string;
    chat: IChat;
    sender: IUser;
    content: string;
    readBy: IUser[];
    createdAt: string;
    updatedAt: string;
}