import { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { SocketSingleton } from "../../features/Socket/lib";
import { Player, SocketActions } from "../../features/Socket/types";
import { AppReducerActions } from "../../redux/AppReducer/actions";
import { AppSettings, useAppSelector } from "../../redux/store";
import { Modal } from "../Modal";

interface ErrorEmit {
  state: boolean;
  message: string;
}

export const KickSuggestModal: FunctionComponent = (): JSX.Element => {
  const { kickVoteSuggest } = useAppSelector(AppSettings);
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const socket = SocketSingleton.getInstance().getSocket();
  const [isError, setIsError] = useState<ErrorEmit>({
    state: false,
    message: "",
  });
  const handlerCancel = () => {
    dispatch({
      type: AppReducerActions.kickVoteSuggest,
      payload: { isVisible: false },
    });
  };

  const onSubmit = async () => {
    const localPlayer = JSON.parse(sessionStorage.player) as Player;

    const result = (await socket.emit(
      SocketActions.CONFIRM_TO_KICK_MEMBER,
      [localPlayer],
      true
    )) as { isStarted: boolean; message: string };
    if (result.isStarted) {
      dispatch({
        type: AppReducerActions.kickVoteSuggest,
        payload: { isVisible: false },
      });
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
        open={kickVoteSuggest.isVisible}
        onCancel={handlerCancel}
        heading="CONFIRM KICK PLAYER?"
        buttonTextConfirm="Confirm"
        buttonTextCancel="No"
      >
        <form id="kick-start-form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            {kickVoteSuggest.initiator?.firstName}{" "}
            {kickVoteSuggest.initiator?.lastName}{" "}
            {kickVoteSuggest.victim?.firstName}{" "}
            {kickVoteSuggest.victim?.lastName}
          </div>
          {isError.state ? isError.message : ""}
        </form>
      </Modal>
    </>
  );
};
