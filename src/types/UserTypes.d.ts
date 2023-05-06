export interface IUser {
    _id: string | null;
    displayName: string | null;
    username: string | null;
    email: string | null;
    isVerified: boolean | null;
    bio?: string | null;
    location?: string | null;
    avatar?: string | null;
    avatarId?: string | null;
    cover?: string | null;
    coverId?: string | null;
    following?: IUser[]; // Assuming an array of user IDs
    createdAt: string | null; // Assuming date is received as a string (e.g., ISO 8601 format)
    updatedAt?: string | null; // Assuming date is received as a string (e.g., ISO 8601 format)
  }
  