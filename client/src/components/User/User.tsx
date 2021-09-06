import "./user.scss";
import { userClassesHelper } from "./userHelper";

interface UserProps {
  avatar: string;
  firstName: string;
  lastName: string;
  jobPosition: string;
  isYou: boolean;
  isChat: boolean;
}

export const User: React.FC<UserProps> = ({
  firstName,
  lastName,
  jobPosition,
  isYou,
  avatar,
  isChat,
}: UserProps) => {
  const userClasses = userClassesHelper(isChat);
  const userAvatar: JSX.Element =
    avatar.length === 2 ? (
      <span className="user__avatar--span text-xl text-bold">{`${avatar}`}</span>
    ) : (
      <img src={`${avatar}`} alt="Your avatar" className="user__avatar--img" />
    );

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
                src="./icons/cancel.svg"
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
