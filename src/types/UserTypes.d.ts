export interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    bio?: string;
    location?: string
    avatar: string;
    cover?: string;
    followers: [
        {
            _id: string;
        }
    ];
    following?: [
        {
            _id: string;
        }
    ];
    likes?: [
        {
            _id: string;
        }
    ];
    retweets: [
        {
            _id: string;
        }
    ];
    comments: [
        {
            _id: string;
        }
    ];
    createdAt: Date;
    updatedAt: Date;
}