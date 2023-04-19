export interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    bio?: string;
    location?: string;
    avatar: string;
    cover?: string;
    following?: [
        {
            _id: string;
        }
    ];
    createdAt: Date;
    updatedAt: Date;
}