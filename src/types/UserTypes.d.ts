export interface IUser {
    _id: string;
    displayName: string;
    username: string;
    email?: string;
    isVerified: boolean;
    bio?: string;
    location?: string;
    avatar?: string;
    cover?: string;
    following?: IUser[]; // Assuming an array of user IDs
    createdAt: string; // Assuming date is received as a string (e.g., ISO 8601 format)
    updatedAt?: string; // Assuming date is received as a string (e.g., ISO 8601 format)
  }
  