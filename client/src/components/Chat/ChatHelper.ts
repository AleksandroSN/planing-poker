import { UseFormReset } from "react-hook-form";
import { SocketSingleton } from "../../features/Socket/lib";
import { sendChatMessage } from "../../features/Socket/lib/getAndPutData";
import { Player } from "../../features/Socket/types";
import { FormValues } from "../../types/interface";

export const submitChatMessage = (
  data: FormValues,
  reset: UseFormReset<FormValues>
): void => {
  const socket = SocketSingleton.getInstance().getSocket();
  const localPlayer = sessionStorage.getItem("player");
  if (localPlayer) {
    const player = JSON.parse(localPlayer) as Player;
    const newMessage = {
      messageText: data.ChatMessage,
      playerId: player.id,
      lobbyId: player.lobbyId,
    };
    sendChatMessage(newMessage, socket);
    reset();
  }
};
