import { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { SocketSingleton } from "../../features/Socket/lib";
import { Player, SocketActions } from "../../features/Socket/types";
import { AppReducerActions } from "../../redux/AppReducer/actions";
import { AppSettings, useAppSelector } from "../../redux/store";
import { Modal } from "../Modal";
import "./KickStartModal.scss";

interface ErrorEmit {
  state: boolean;
  message: string;
}

export const KickStartModal: FunctionComponent = (): JSX.Element => {
  const { kickVoteStart } = useAppSelector(AppSettings);
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const socket = SocketSingleton.getInstance().getSocket();
  const [isError, setIsError] = useState<ErrorEmit>({
    state: false,
    message: "",
  });
  const handlerCancel = () => {
    dispatch({
      type: AppReducerActions.kickVoteStart,
      payload: { isVisible: false },
    });
    setIsError({ state: false, message: "" });
  };

  const onSubmit = async () => {
    const localPlayer = JSON.parse(sessionStorage.player) as Player;
    if (localPlayer.role === "Dealer") {
      const result = (await socket.emit(
        SocketActions.KICK_MEMBER,
        [localPlayer, kickVoteStart.victim],
        true
      )) as { isStarted: boolean; message: string };
      if (result.isStarted) {
        dispatch({
          type: AppReducerActions.kickVoteStart,
          payload: { isVisible: false },
        });
      }
    } else {
      const result = (await socket.emit(
        SocketActions.KICK_MEMBER,
        [localPlayer, kickVoteStart.victim],
        true
      )) as { isStarted: boolean; message: string };
      if (result.isStarted) {
        dispatch({
          type: AppReducerActions.kickVoteStart,
          payload: { isVisible: false },
        });
        setIsError({ state: false, message: "" });
      } else {
        setIsError({
          state: true,
          message: result.message,
        });
      }
    }
  };

  return (
    <>
      <Modal
        idForm="kick-start-form"
        open={kickVoteStart.isVisible}
        onCancel={handlerCancel}
        heading="KICK PLAYER?"
        buttonTextConfirm="Confirm"
        buttonTextCancel="No"
      >
        <form id="kick-start-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="kick-member">
            Are you really want to remove{" "}
            <span className="player-name-in-modal">
              {kickVoteStart.victim?.firstName} {kickVoteStart.victim?.lastName}{" "}
            </span>{" "}
            from game session
          </div>
          {isError.state ? isError.message : ""}
        </form>
      </Modal>
    </>
  );
};
