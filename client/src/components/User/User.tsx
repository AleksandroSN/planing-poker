import { FunctionComponent } from "react";
import { renderUserAvatar } from "../../lib";
import { userClassesHelper } from "./userHelper";
import "./user.scss";
import { UserProps } from "./types";

export const User: FunctionComponent<UserProps> = ({
  firstName,
  lastName,
  jobPosition,
  isYou,
  avatar,
  isChat,
}: UserProps): JSX.Element => {
  const userClasses = userClassesHelper(isChat);
  const userAvatar = renderUserAvatar(avatar);

  return (
    <div className={userClasses.user}>
      <div className={userClasses.wrapper}>
        <picture className={userClasses.avatar}>
          {/* <img src="./img/avatar.png" alt="Your avatar"/> */}
          {userAvatar}
        </picture>
        <div className={userClasses.body}>
          {isYou && <div className={userClasses.valid}>ITS YOU</div>}
          <div className={userClasses.name}>{`${firstName} ${lastName}`}</div>
          <div className={userClasses.job}>{`${jobPosition}`}</div>
        </div>
        <div className={userClasses.button}>
          {!isYou && (
            <button type="button" className={userClasses.buttonBody}>
              <img
                src="../icons/cancel.svg"
                alt="cancel button"
                className={userClasses.buttonImg}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
