import { FunctionComponent, useState } from "react";
import { InputText } from "../InputText";
import { ChatRow } from "./ChatRow/ChatRow";
import "./chat.scss";

interface ChatProps {
  message?: string;
}

export const Chat: FunctionComponent<ChatProps> = (): JSX.Element => {
  const [message, setMessage] = useState<string[]>(["Heelo", "Muhahaha"]);

  // const updateMessages = (text: string) => {
  //   setMessage((arr) => [...arr, text]);
  // };

  const messages = message.map((mes) => {
    return <ChatRow message={mes} />;
  });
  return (
    <div className="chat">
      {messages}
      <InputText inputProps={{ labelText: "" }} />
    </div>
  );
};
