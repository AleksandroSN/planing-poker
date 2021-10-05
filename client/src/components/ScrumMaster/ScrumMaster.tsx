import { FunctionComponent, useEffect, useState } from "react";
import { Player } from "../../features/Socket/types";
import { dummyPlayer, isReallyYou } from "../../lib";
import { User } from "../User";

interface ScrumMasterProps {
  playersFromRedux: Player[];
}

export const ScrumMaster: FunctionComponent<ScrumMasterProps> = ({
  playersFromRedux,
}): JSX.Element => {
  const [dealerState, setDealerState] = useState<Player>(dummyPlayer);
  useEffect(() => {
    if (playersFromRedux.length > 0) {
      const dealer = playersFromRedux.filter(
        (player) => player.role === "Dealer"
      )[0];
      setDealerState(dealer);
    }
  }, [playersFromRedux]);
  return (
    <div className="master-card">
      <div className="master-card__title">Scrum master:</div>
      <User
        avatar={dealerState.avatarImage}
        firstName={dealerState.firstName}
        lastName={dealerState.lastName}
        jobPosition={dealerState.jobPosition}
        isChat={false}
        isYou={isReallyYou(dealerState.id)}
        player={dealerState}
      />
    </div>
  );
};
