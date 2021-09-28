import { useReducer, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  MainPageReducer,
  initialStateMainPage,
  MainPageReducerActionType,
} from "./reducer";
import { uploadImage, BASE_SERVER } from "../../../../lib";
import { FormValues } from "../../../../types/interface";
import { createMaster } from "../../../Socket/lib/createMaster";
import { NewPlayer, Player } from "../../../Socket/types";
import { HandlersMainPageContextModel } from "../../types";
import { useAppSelector, GameSettingsState } from "../../../../redux/store";
import { createMember } from "../../../Socket/lib/createMember";

export const useReducerProvider = (): HandlersMainPageContextModel => {
  const [MainPageState, dispatch] = useReducer(
    MainPageReducer,
    initialStateMainPage
  );
  const reduxDispatch = useDispatch();
  const lobbyId = useAppSelector(GameSettingsState);

  const setMasterRole = () => {
    dispatch({
      type: MainPageReducerActionType.setRole,
      payload: { role: "Dealer", openModal: true },
    });
  };

  const setMemberRole = () => {
    dispatch({
      type: MainPageReducerActionType.setRole,
      payload: { role: "Member", openModal: true },
    });
  };

  const toggleModal = () => {
    dispatch({
      type: MainPageReducerActionType.openModal,
      payload: { openModal: !MainPageState.openModal },
    });
  };

  const toggleAuth = () => {
    dispatch({
      type: MainPageReducerActionType.authorization,
      payload: { isAuth: !MainPageState.isAuth },
    });
  };

  const setStrToAvatar = useCallback((str: string) => {
    dispatch({
      type: MainPageReducerActionType.setStrToAvatar,
      payload: { avatar: str },
    });
  }, []);

  const setImgToAvatar = useCallback((img: string, label: string) => {
    dispatch({
      type: MainPageReducerActionType.setImgToAvatar,
      payload: { avatar: img, inputFileLabel: label },
    });
  }, []);

  const createPlayer = async (player: NewPlayer): Promise<Player> => {
    if (MainPageState.role === "Dealer") {
      const res = await createMaster(player, reduxDispatch);
      return res;
    }
    const res = await createMember(player, lobbyId, reduxDispatch);
    return res;
  };

  const submitData = async (data: FormValues) => {
    const srcAvatar = await uploadImage(data);
    const observerRole = data["Connect as Observer"] && "Observer";
    const player: NewPlayer = {
      firstName: data["Your first name"],
      lastName: data["Your last name"],
      jobPosition: data["Your Job position"],
      avatarImage: srcAvatar ? `${BASE_SERVER}${srcAvatar.path}` : "",
      role: observerRole || MainPageState.role,
    };
    const socketRes = await createPlayer(player);
    localStorage.setItem("player", JSON.stringify(socketRes));
    dispatch({
      type: MainPageReducerActionType.submitForm,
      payload: {
        openModal: !MainPageState.openModal,
        isAuth: !MainPageState.isAuth,
      },
    });
  };

  const validateLobby = (link: string) => {
    // send value to server
    reduxDispatch({ type: "UPDATE_SETTINGS", payload: { lobbyId: link } });
  };

  const registerMember = (link: string) => {
    setMemberRole();
    validateLobby(link);
  };

  return {
    MainPageState,
    setMasterRole,
    // setMemberRole,
    toggleModal,
    toggleAuth,
    setStrToAvatar,
    setImgToAvatar,
    submitData,
    // validateLobby,
    registerMember,
  };
};
