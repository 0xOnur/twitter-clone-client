interface INotification {
    _id: string;
    type: "like" | "retweet" | "reply" | "follow" | "quote";
    sender: IUser;
    receiver: mongoose.Types.ObjectId;
    tweetId?: mongoose.Types.ObjectId;
    read: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}