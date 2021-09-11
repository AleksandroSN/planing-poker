import { db } from "../../db/db";
import { v4 as uuidv4 } from "uuid";
import { ChatMessage, NewChatMessage } from "../../types";

export const createNewMessage = (
  newMessage: NewChatMessage
): Promise<ChatMessage> => {
  const messageTime = Date.now() + "";
  const message = {
    ...newMessage,
    id: uuidv4(),
    messageTime,
  };
  db.chatMessages.push(message);
  return Promise.resolve(message);
};

export const getMessagesStartFromId = (
  lobbyId: string,
  messageId: string,
  msgsQty: number
): Promise<ChatMessage[]> => {
  let index = 0;
  const lobbyMessages = db.chatMessages.filter(
    (message) => message.lobbyId === lobbyId
  );
  if (messageId !== "0")
    index = lobbyMessages.findIndex((msg) => (msg.id = messageId));
  if (index + 1 > 0) {
    const result = lobbyMessages.slice(index + 1, index + msgsQty);
    return Promise.resolve(result);
  } else return Promise.resolve([]);
};
