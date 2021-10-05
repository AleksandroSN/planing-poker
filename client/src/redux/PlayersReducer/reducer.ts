import { FluxStandardAction } from "flux-standard-action";
import { Player } from "../../features/Socket/types";
import { PlayersReducerActions } from "./actions";

type PlayersState = {
  players: Player[];
};

const initialPlayerState: PlayersState = {
  players: [],
};

export const playersReducer = (
  state: PlayersState = initialPlayerState,
  action: FluxStandardAction
): PlayersState => {
  switch (action.type) {
    case PlayersReducerActions.addPlayer: {
      const newPlayer = action.payload as unknown as Player;
      return { ...state, players: [...state.players, newPlayer] };
    }
    case PlayersReducerActions.updatePlayers: {
      const newPlayers = action.payload as unknown as Player[];
      return { ...state, players: newPlayers };
    }
    case PlayersReducerActions.deletePlayer: {
      const victim = action.payload as unknown as Player;
      const index = state.players.findIndex((elem) => elem.id === victim.id);
      const newPlayers = [
        ...state.players.slice(0, index),
        ...state.players.slice(index + 1),
      ];
      return { ...state, players: newPlayers };
    }
    default:
      return state;
  }
};
