import { Dispatch } from "redux";
import { SocketSingleton } from ".";
import { LobbySetting } from "../types";
import { sendNewSettings } from "./getAndPutData";

export const updateSettings = async (
  newSettings: LobbySetting,
  dispatch: Dispatch
): Promise<void> => {
  dispatch({ type: "IS_LOADING_DATA", payload: true });
  const socket = SocketSingleton.getInstance().getSocket();
  const settings = await sendNewSettings(socket, newSettings);
  dispatch({ type: "UPDATE_SETTINGS", payload: settings.newLobbySettings });
  dispatch({ type: "IS_LOADING_DATA", payload: false });
};
