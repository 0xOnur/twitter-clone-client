interface IChat {
    _id: string;
    participants: {
        user: IUser,
        hasLeft: boolean,
        isPinned: boolean,
    }[];
    isGroupChat?: boolean;
    chatName?: string;
    chatImage?: string;
    lastMessage?: IMessage;
}