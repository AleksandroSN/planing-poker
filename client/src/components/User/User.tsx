import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { renderUserAvatar } from "../../lib";
import { userClassesHelper } from "./userHelper";
import "./user.scss";
import { UserProps } from "./types";
import { AppReducerActions } from "../../redux/AppReducer/actions";

export const User: FunctionComponent<UserProps> = ({
  firstName,
  lastName,
  jobPosition,
  isYou,
  avatar,
  isChat,
  player,
}: UserProps): JSX.Element => {
  const userClasses = userClassesHelper(isChat);
  const userAvatar = renderUserAvatar(avatar);
  const dispatch = useDispatch();

  const handlerKick = () => {
    dispatch({
      type: AppReducerActions.kickVoteStart,
      payload: { isVisible: true, victim: player },
    });
  };

  return (
    <div className={userClasses.user}>
      <div className={userClasses.wrapper}>
        <picture className={userClasses.avatar}>{userAvatar}</picture>
        <div className={userClasses.body}>
          {isYou && <div className={userClasses.valid}>ITS YOU</div>}
          <div className={userClasses.name}>{`${firstName} ${lastName}`}</div>
          <div className={userClasses.job}>{`${jobPosition}`}</div>
        </div>
        <div className={userClasses.button}>
          {!isYou && player?.role !== "Dealer" && (
            <button
              type="button"
              className={userClasses.buttonBody}
              onClick={handlerKick} // ADD CLICK HANDLER>
            >
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
