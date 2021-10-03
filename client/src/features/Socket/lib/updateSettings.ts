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
  await sendNewSettings(socket, newSettings);
  dispatch({ type: "IS_LOADING_DATA", payload: false });
};
