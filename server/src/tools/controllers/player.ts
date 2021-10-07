import { Socket, Server } from "socket.io";
import { LobbySetting, NewPlayer, Player, SocketActions } from "../../types";
import {
  createNewPlayer,
  deletePlayer,
  getLobbySettings,
  getPlayersInLobby,
} from "../models";

export const addNewTeamMember = async (
  socket: Socket,
  teamMember: NewPlayer,
  lobbyId: string,
  callback: (response: {
    player: Player;
    initLobbySettings: LobbySetting;
  }) => void
): Promise<void> => {
  socket.join(lobbyId);
  const player = await createNewPlayer(teamMember, lobbyId);
  const initLobbySettings = (await getLobbySettings(
    player.lobbyId
  )) as LobbySetting;
  callback({ player, initLobbySettings });
  socket.to(lobbyId).emit(SocketActions.NOTIFY_ABOUT_NEW_MEMBER, player);
};

export const getLobbyMembers = async (
  player: Player,
  callback: (members: Player[]) => void
): Promise<void> => {
  const members = await getPlayersInLobby(player.lobbyId);
  callback(members);
};

export const deleteTeamMember = async (
  io: Server,
  player: Player
): Promise<void> => {
  await deletePlayer(player.id);
  io.to(player.lobbyId).emit(SocketActions.NOTIFY_ABOUT_KICKING_MEMBER, player);
};
