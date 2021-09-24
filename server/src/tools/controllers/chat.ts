import { Server } from "socket.io";
import { ChatMessage, NewChatMessage, SocketActions } from "../../types";
import { createNewMessage, getMessagesStartFromId } from "../models";

export const sendChatMessage = async (
  message: NewChatMessage,
  io: Server
): Promise<void> => {
  const newMessage = await createNewMessage(message);
  io.to(newMessage.lobbyId).emit(SocketActions.RECIEVE_NEW_MESSAGE, newMessage);
};

export const getChatMessages = async (
  lobbyId: string,
  lastMessageId: string,
  messageQty: number,
  callback: (messages: ChatMessage[]) => void
): Promise<void> => {
  const messages = await getMessagesStartFromId(
    lobbyId,
    lastMessageId,
    messageQty
  );
  callback(messages);
};
