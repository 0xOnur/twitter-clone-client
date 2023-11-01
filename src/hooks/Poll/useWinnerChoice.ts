import { useState, useEffect } from "react";

const useWinnerChoice = (choices?: IChoice[]) => {
  const [winnerChoiceId, setWinnerChoiceId] = useState(null);

  useEffect(() => {
    if (!choices || choices.length === 0) {
      setWinnerChoiceId(null);
      return;
    }

    let maxVotes = -1;
    let winnerId = null;
    let tieDetected = false;

    for (const choice of choices) {
      const votes = choice.votes ? choice.votes.length : 0;

      if (votes === maxVotes) {
        tieDetected = true;
      }

      if (votes > maxVotes) {
        maxVotes = votes;
        winnerId = choice._id;
        tieDetected = false;
      }
    }

    if (tieDetected) {
      setWinnerChoiceId(null);
    } else {
      setWinnerChoiceId(winnerId);
    }
  }, [choices]);

  return winnerChoiceId;
};

export default useWinnerChoice;
