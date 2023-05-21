export interface IUser {
    _id: string;
    displayName: string;
    username: string;
    email: string;
    isVerified: boolean;
    bio?: string;
    location?: string;
    website?: string;
    avatar?: string;
    avatarId?: string;
    cover?: string;
    coverId?: string;
    birthDay?: {
      day: number;
      month: number;
      year: number;
    };
    following?: IUser[
      _id
    ]; // Assuming an array of user IDs
    followers?: IUser[
      _id
    ]; // Assuming an array of user IDs
    createdAt: string; // Assuming date is received as a string (e.g., ISO 8601 format)
    updatedAt?: string; // Assuming date is received as a string (e.g., ISO 8601 format)
  }
  