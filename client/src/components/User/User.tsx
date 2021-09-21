import { FunctionComponent } from "react";
import "./user.scss";
import { renderUserAvatar, userClassesHelper } from "./userHelper";

interface UserProps {
  avatar: string;
  firstName: string;
  lastName: string;
  jobPosition: string;
  isYou: boolean;
  isChat: boolean;
}

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
