import { Dispatch } from "redux";
import { SocketSingleton, SocketMethods } from ".";
import { IssuesModel } from "../../LobbyPage/types/interface";

export const addNewIssue = async (
  newIssue: IssuesModel,
  dispatch: Dispatch
): Promise<void> => {
  dispatch({ type: "IS_LOADING_DATA", payload: true });
  const socket = SocketSingleton.getInstance().getSocket();
  await socket.connect();
  await SocketMethods.sendNewIssue(socket, newIssue);
  dispatch({ type: "IS_LOADING_DATA", payload: false });
};
