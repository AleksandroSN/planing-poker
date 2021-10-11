import { FunctionComponent, useEffect, useState } from "react";
import { User } from "../../../../components/User/User";
import { isReallyYou } from "../../../../lib/isReallyYou";
import {
  AppSettings,
  GameSettingsCurrent,
  IssuesRedux,
  ResultRedux,
  useAppSelector,
} from "../../../../redux/store";
import { Player } from "../../../Socket/types";
import "./progress.scss";

interface ProgressItemProps {
  player: Player;
}

export const ProgressItem: FunctionComponent<ProgressItemProps> = ({
  player,
}) => {
  const { changingCardInRoundEnd } = useAppSelector(GameSettingsCurrent);
  const { roundControl } = useAppSelector(AppSettings);
  const { issues } = useAppSelector(IssuesRedux);
  const results = useAppSelector(ResultRedux);
  const [vote, setVote] = useState<string>("In progress");

  useEffect(() => {
    const votingIssueIdx = issues.findIndex(
      (issue) => issue.issueStatus === "voting"
    );
    if (votingIssueIdx >= 0) {
      const { id } = issues[votingIssueIdx];
      const currentRound = results[id];
      if (currentRound) {
        const playerVote = currentRound.votes[player.id];
        setVote(playerVote);
      }
    }
  }, [results, issues]);

  const flipVoteCard = () => {
    if (changingCardInRoundEnd && roundControl.status === "isStoped") {
      return `${vote}`;
    }
    if (vote && !changingCardInRoundEnd) {
      return `${vote}`;
    }
    return "In progress";
  };

  const isYou = isReallyYou(player.id);
  return (
    <div className="progress-item__wrapper">
      <p className="progress-item">{flipVoteCard()}</p>
      <User
        key={player.id}
        avatar={player.avatarImage}
        firstName={player.firstName}
        lastName={player.lastName}
        jobPosition={player.jobPosition}
        isChat
        player={player}
        isYou={isYou}
      />
    </div>
  );
};
