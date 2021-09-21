import {
  ChatMessage,
  Issue,
  LobbySetting,
  NewPlayer,
  Player,
  SocketActions,
} from "../types";
import { SocketAPI } from "./SocketAPI";

export const getLobbyPlayers = async (
  socket: SocketAPI,
  player: Player
): Promise<Player[]> => {
  const promise = socket.emit(
    SocketActions.GET_LOBBY_MEMBERS,
    [player],
    true
  ) as Promise<Player[]>;
  return promise;
};

export const getLobbyIssues = async (
  socket: SocketAPI,
  player: Player
): Promise<Issue[]> => {
  const promise = socket.emit(
    SocketActions.GET_LOBBY_ISSUES,
    [player.lobbyId],
    true
  ) as Promise<Issue[]>;
  return promise;
};

export const getLobbyMessages = async (
  socket: SocketAPI,
  player: Player,
  lastMessageId: string,
  messageQty: number
): Promise<ChatMessage[]> => {
  const promise = socket.emit(
    SocketActions.GET_CHAT_MESSAGES,
    [player.lobbyId, lastMessageId, messageQty],
    true
  ) as Promise<ChatMessage[]>;
  return promise;
};

export type CreateNewRoomResponse = {
  player: Player;
  initLobbySettings: LobbySetting;
};

export const createNewLobby = async (
  socket: SocketAPI,
  master: NewPlayer
): Promise<CreateNewRoomResponse> => {
  const promise = socket.emit(
    SocketActions.CREATE_NEW_ROOM,
    [master],
    true
  ) as Promise<CreateNewRoomResponse>;
  return promise;
};
