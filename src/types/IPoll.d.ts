interface IPoll {
    author?: string;
    choices: IChoice[];
    expiresAt: string;
    totalVotes?: number;
  }