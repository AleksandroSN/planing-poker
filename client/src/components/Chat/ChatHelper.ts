import { Dispatch } from "react";
import { UseFormReset } from "react-hook-form";
import { Player } from "../../features/Socket/types";
import { ChatMessagesReducerActions } from "../../redux/ChatMessagesReducer/actions";
import { FormValues } from "../../types/interface";

export const submitChatMessage = (
  data: FormValues,
  dispatch: Dispatch<any>,
  reset: UseFormReset<FormValues>
): void => {
  const localPlayer = sessionStorage.getItem("player");
  if (localPlayer) {
    const player = JSON.parse(localPlayer) as Player;
    const today = new Date();
    const newMessage = {
      id: Date.now(),
      messageText: data.ChatMessage,
      messageTime: `${today.getUTCHours()}:${today.getUTCMinutes()}:${today.getUTCSeconds()}`,
      playerId: player.id,
      lobbyId: player.lobbyId,
      playerData: player,
    };
    dispatch({
      type: ChatMessagesReducerActions.addMessage,
      payload: newMessage,
    });
    reset();
  }
};
