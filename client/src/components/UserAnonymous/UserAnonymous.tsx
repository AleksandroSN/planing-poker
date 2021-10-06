import React, { FunctionComponent } from "react";
import { User } from "../User";
import "./style.scss";

interface UserAnonymousProps {
  id: string;
}

export const UserAnonymous: FunctionComponent<UserAnonymousProps> = ({
  id,
}): JSX.Element => {
  return (
    <>
      <User
        key={id}
        avatar="../icons/skull.svg"
        firstName="DELETED"
        lastName=""
        jobPosition=""
        isYou
        isChat
      />
    </>
  );
};
