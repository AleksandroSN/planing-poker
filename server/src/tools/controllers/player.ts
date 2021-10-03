import { Socket } from "socket.io";
import { LobbySetting, NewPlayer, Player, SocketActions } from "../../types";
import {
  createNewPlayer,
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
