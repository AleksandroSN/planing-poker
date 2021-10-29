import { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { SocketSingleton } from "../../features/Socket/lib";
import { Player, SocketActions } from "../../features/Socket/types";
import { AppReducerActions } from "../../redux/AppReducer/actions";
import {
  AppSettings,
  GameSettingsCurrent,
  useAppSelector,
} from "../../redux/store";
import { Modal } from "../Modal";
import "./KickSuggesttModal.scss";

interface ErrorEmit {
  state: boolean;
  message: string;
}

export const KickSuggestModal: FunctionComponent = (): JSX.Element => {
  const { kickVoteSuggest } = useAppSelector(AppSettings);
  const { appStage } = useAppSelector(GameSettingsCurrent);
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const socket = SocketSingleton.getInstance().getSocket();
  let localPlayer: Player = {
    id: "",
    firstName: "",
    lastName: "",
    jobPosition: "",
    avatarImage: "",
    role: "Observer",
    lobbyId: "",
  };
  if (sessionStorage.player) {
    localPlayer = JSON.parse(sessionStorage.player) as Player;
  }
  const [isError, setIsError] = useState<ErrorEmit>({
    state: false,
    message: "",
  });
  const handlerCancel = () => {
    dispatch({
      type: AppReducerActions.kickVoteSuggest,
      payload: { isVisible: false },
    });
    setIsError({ state: false, message: "" });
  };
  const onSubmit = async () => {
    const result = (await socket.emit(
      SocketActions.CONFIRM_TO_KICK_MEMBER,
      [localPlayer],
      true
    )) as { isVoted: boolean; message: string };
    if (result.isVoted) {
      dispatch({
        type: AppReducerActions.kickVoteSuggest,
        payload: { isVisible: false },
      });
      setIsError({ state: false, message: "" });
    } else {
      setIsError({
        state: true,
        message: result.message,
      });
    }
  };

  return (
    <>
      <Modal
        idForm="kick-start-form"
        open={
          kickVoteSuggest.isVisible &&
          localPlayer.id !== kickVoteSuggest.initiator?.id &&
          localPlayer.id !== kickVoteSuggest.victim?.id &&
          (appStage === "lobby" || appStage === "game")
        }
        onCancel={handlerCancel}
        heading="CONFIRM KICK PLAYER?"
        buttonTextConfirm="Confirm"
        buttonTextCancel=""
        buttonClassesCancel=""
      >
        <form id="kick-start-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="kick-member">
            <span className="player-name-in-modal">
              {kickVoteSuggest.initiator?.firstName}{" "}
              {kickVoteSuggest.initiator?.lastName}
            </span>{" "}
            want to kick member{" "}
            <span className="player-name-in-modal">
              {" "}
              {kickVoteSuggest.victim?.firstName}{" "}
              {kickVoteSuggest.victim?.lastName}
            </span>
            . Do you agree with it?
          </div>
          {isError.state ? isError.message : ""}
        </form>
      </Modal>
    </>
  );
};
