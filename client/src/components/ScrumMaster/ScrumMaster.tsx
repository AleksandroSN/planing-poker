import { FunctionComponent } from "react";
import { User } from "../User/User";

export const ScrumMaster: FunctionComponent = (): JSX.Element => {
  return (
    <div className="master-card__wrapper">
      <div className="master-card__title">Scrum master:</div>
      <User
        avatar="SA"
        firstName="Sa"
        lastName="Nterna"
        jobPosition="developer"
        isChat
        isYou
      />
    </div>
  );
};
