interface IChat {
    _id: string;
    participants: IUser[];
    isGroupChat?: boolean;
    isPinned: boolean;
    chatName?: string;
    chatImage?: string;
    lastMessage?: IMessage;
}