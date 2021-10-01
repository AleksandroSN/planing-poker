import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ChatMessagesReducerActions } from "../../redux/ChatMessagesReducer/actions";
import { ChatMessage, useAppSelector } from "../../redux/store";
import { Player } from "../../features/Socket/types";
import { FormValues } from "../../types/interface";
import { AnimeOpacity } from "../../lib";
import { InputText } from "../InputText";
import { ChatRow } from "./ChatRow";
import "./chat.scss";

export const Chat: FunctionComponent = (): JSX.Element => {
  const { register, handleSubmit } = useForm<FormValues>();
  const { chatMessages } = useAppSelector(ChatMessage);
  const dispatch = useDispatch();
  const onSubmit = (data: FormValues) => {
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
    }
  };

  const messages = chatMessages.map((mes) => {
    return (
      <AnimeOpacity item={mes}>
        <ChatRow
          key={mes.id}
          messageText={mes.messageText}
          id={mes.id}
          messageTime={mes.messageTime}
          playerId={mes.playerId}
          lobbyId={mes.lobbyId}
          playerData={mes.playerData}
        />
      </AnimeOpacity>
    );
  });

  return (
    <form className="chat" onSubmit={handleSubmit(onSubmit)}>
      {messages}
      <InputText
        inputProps={{
          labelText: "ChatMessage",
          labelClasses: "input-text__label chat__label",
          inputClasses: "input-text__input chat__input",
        }}
        hookForm={{
          onRegister: register,
        }}
      />
    </form>
  );
};
