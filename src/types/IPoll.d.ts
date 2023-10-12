interface IPoll {
    author?: string;
    choices: {
      _id: number | string;
      text: string;
      votes?: string[];
      percentage?: number;
    }[];
    expiresAt: Date;
    totalVotes?: number;
  }