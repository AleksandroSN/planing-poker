import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ChatMessage, useAppSelector } from "../../redux/store";
import { FormValues } from "../../types/interface";
import { AnimeOpacity } from "../../lib";
import { InputText } from "../InputText";
import { submitChatMessage } from "./ChatHelper";
import { ChatRow } from "./ChatRow";
import "./chat.scss";

export const Chat: FunctionComponent = (): JSX.Element => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const { chatMessages } = useAppSelector(ChatMessage);
  const dispatch = useDispatch();
  const onSubmit = (data: FormValues) => {
    submitChatMessage(data, dispatch, reset);
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
