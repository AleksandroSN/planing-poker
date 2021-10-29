import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { ChatMessage, Players, useAppSelector } from "../../redux/store";
import { FormValues } from "../../types/interface";
import { AnimeOpacity } from "../../lib";
import { InputText } from "../InputText";
import { submitChatMessage } from "./ChatHelper";
import { ChatRow } from "./ChatRow";
import "./chat.scss";

export const Chat: FunctionComponent = (): JSX.Element => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const { chatMessages } = useAppSelector(ChatMessage);
  const players = useAppSelector(Players);
  const onSubmit = (data: FormValues) => {
    submitChatMessage(data, reset);
  };
  const messages = chatMessages.map((mes) => {
    const index = players.findIndex((itm) => itm.id === mes.playerId);
    const playerData = players[index];
    return (
      <AnimeOpacity item={mes}>
        <ChatRow
          key={mes.id}
          messageText={mes.messageText}
          id={mes.id}
          messageTime={mes.messageTime}
          playerId={mes.playerId}
          lobbyId={mes.lobbyId}
          playerData={playerData}
        />
      </AnimeOpacity>
    );
  });

  return (
    <form className="chat" onSubmit={handleSubmit(onSubmit)}>
      <div className="chat__wrapper">{messages}</div>

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
